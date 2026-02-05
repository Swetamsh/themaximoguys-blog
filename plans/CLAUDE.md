# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture Overview

This is an EAM (Enterprise Asset Management) consulting website built with Next.js 16, React 19, and TypeScript.

### App Router Structure

The app uses Next.js route groups to separate concerns:

- `app/(marketing)/` - Public-facing pages (home, about, services, contact, industries, case-studies, resources)
- `app/(admin)/` - Protected admin panel (dashboard, leads management)
- `app/api/` - API routes for contact form and leads management
- Each group has its own `layout.tsx` for group-specific layouts

### Component Organization

```
components/
├── ui/          # shadcn/ui primitives (button, card, input, table, etc.)
├── layout/      # Header, Footer
├── marketing/   # Hero, ServicesGrid, CTASection, IndustriesShowcase, MetricsDisplay, Testimonials, etc.
├── content/     # CaseStudyCard, ResourceCard
├── admin/       # LoginForm, admin-specific components
├── ThemeProvider.tsx  # next-themes provider
└── ThemeToggle.tsx    # Dark/light mode toggle
```

### Key Patterns

**Imports**: Use the `@/` path alias for all imports (maps to project root)

**Styling**: Use the `cn()` utility from `@/lib/utils` for conditional Tailwind classes:
```tsx
import { cn } from "@/lib/utils"
cn("base-class", condition && "conditional-class")
```

**Forms**: Use Zod for validation schemas with React Hook Form:
```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
```

**UI Components**: Follow shadcn/ui patterns - components are in `components/ui/` and use Radix UI primitives

**Theming**: Dark/light mode via next-themes. CSS variables defined in `globals.css` for both `:root` (light) and `.dark` (dark) modes.

### Tech Stack

- **Framework**: Next.js 16.1.5 with App Router
- **UI**: Tailwind CSS 4, shadcn/ui components, Lucide icons
- **Forms**: React Hook Form + Zod validation
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Animations**: Framer Motion
- **Theming**: next-themes for dark/light mode

### Database

**IMPORTANT: Multi-Schema Architecture**

This project uses a **multi-schema approach** with separate schemas for different environments:
- `tmg_dev` - Development environment
- `tmg_test` - Testing/staging environment
- `tmg_prod` - Production environment

⚠️ **CRITICAL**: This project does NOT use the `public` schema. All database operations MUST target the schema specified by `NEXT_PUBLIC_DB_SCHEMA`.

#### Schema Configuration

**Environment Variable:**
```bash
NEXT_PUBLIC_DB_SCHEMA=tmg_dev  # Development (default)
NEXT_PUBLIC_DB_SCHEMA=tmg_test # Testing/Staging
NEXT_PUBLIC_DB_SCHEMA=tmg_prod # Production
```

**Schema Selection Guidelines:**
- **tmg_dev**: Local development, feature branches, experimental changes
- **tmg_test**: CI/CD testing, QA validation, pre-production testing
- **tmg_prod**: Production environment, live data

**Accessing the Current Schema:**
```typescript
// In code, always use the environment variable
const schema = process.env.NEXT_PUBLIC_DB_SCHEMA || 'tmg_dev';

// Supabase client queries automatically use the configured schema
const { data } = await supabase
  .from('leads')  // Automatically queries from the correct schema
  .select('*');
```

#### Database Tables

All schemas contain identical table structures:

| Table | Description | Key Fields |
|-------|-------------|------------|
| `profiles` | User profiles with roles | id, email, role (admin/user) |
| `leads` | Contact form submissions | id, name, email, company, message |
| `case_studies` | Published case studies | id, title, slug, content, published_at |
| `resources` | Blog posts, guides, templates | id, title, slug, type, content |
| `analytics_events` | Event tracking | id, event_type, user_id, metadata |
| `audit_logs` | Security audit trail | id, action, user_id, table_name, record_id |
| `user_sessions` | Multi-device session tracking | id, user_id, device_info, last_activity |

#### Row Level Security (RLS)

- **All tables have RLS enabled** across all schemas
- **Admin users** can access all records via JWT custom claims (`role = 'admin'`)
- **Regular users** have restricted access based on RLS policies
- **Anonymous users** can only access public-facing content

#### Backend Logic vs Database Triggers

**⚠️ CRITICAL ARCHITECTURAL RULE: NO DATABASE TRIGGERS FOR BUSINESS LOGIC**

This project **DOES NOT** use database triggers for business logic. All data transformations, calculations, and updates MUST be handled in the application layer.

**❌ DO NOT:**
- Create database triggers for business logic (e.g., auto-calculating scores, updating timestamps)
- Hide business logic in the database layer
- Use triggers for data validation or transformation

**✅ DO:**
- Implement all business logic in API routes (`app/api/`)
- Use TypeScript/JavaScript for data transformations
- Keep logic visible and testable in the codebase
- Use RLS policies for security/authorization only

**Rationale:**
- **Testability**: Application logic is easier to unit test
- **Visibility**: Logic is in version-controlled code, not hidden in database
- **Debugging**: Easier to trace and debug application-level code
- **Portability**: Reduces database-specific dependencies
- **Team Collaboration**: Developers can see all logic in the codebase

**Example - Profile Completion Score:**
```typescript
// ✅ CORRECT: Calculate in application layer
export async function updateProfile(userId: string, updates: ProfileUpdate) {
  // Calculate profile completion score in TypeScript
  const score = calculateProfileCompletionScore({
    full_name: updates.full_name,
    avatar_url: updates.avatar_url,
    industry: updates.industry,
    // ... other fields
  });

  // Update with calculated score
  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      profile_completion_score: score,
      profile_updated_at: new Date().toISOString()
    })
    .eq('id', userId);

  return { data, error };
}

// ❌ WRONG: Using database trigger
// CREATE TRIGGER calculate_score BEFORE UPDATE ON profiles ...
```

**Exception:** Database triggers are ONLY acceptable for:
- Audit logging (system-level tracking)
- Timestamp management (`created_at`, `updated_at`) if not handled by Supabase
- **Never** for business logic or computed fields

#### Database Migrations

**Location:** `supabase/migrations/`

**Migration Rules:**
1. Always create migrations with schema-aware SQL
2. Use the `NEXT_PUBLIC_DB_SCHEMA` variable dynamically
3. Test migrations in `tmg_dev` first
4. Promote to `tmg_test` for validation
5. Deploy to `tmg_prod` only after thorough testing

**Migration Template:**
```sql
-- Use the schema from environment variable
-- For local dev: tmg_dev
-- For testing: tmg_test
-- For production: tmg_prod

CREATE TABLE IF NOT EXISTS tmg_dev.table_name (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- columns...
);

-- Enable RLS
ALTER TABLE tmg_dev.table_name ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "policy_name" ON tmg_dev.table_name
  FOR SELECT USING (auth.uid() = user_id);
```

**Switching Schemas:**
When switching environments, update `.env.local`:
```bash
# For development
NEXT_PUBLIC_DB_SCHEMA=tmg_dev

# For testing
NEXT_PUBLIC_DB_SCHEMA=tmg_test

# For production
NEXT_PUBLIC_DB_SCHEMA=tmg_prod
```

Then restart the development server: `npm run dev`

### MCP (Model Context Protocol) Configuration

This project includes MCP server configuration for enhanced development capabilities.

**MCP Configuration File:** `.mcp.json`

The project is configured with the Supabase MCP server, which provides:
- Direct database access via MCP tools
- Schema inspection and management
- Real-time data operations
- OAuth-based authentication

**Using MCP Servers:**
- The `.mcp.json` file is committed to the repository for team consistency
- MCP servers provide enhanced tooling for Claude Code and other MCP-compatible tools
- Authentication is handled via OAuth when using the Supabase MCP server

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

**Required Variables:**
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key  # Server-side only, never expose to client

# Database Schema (REQUIRED)
NEXT_PUBLIC_DB_SCHEMA=tmg_dev  # Options: tmg_dev, tmg_test, tmg_prod
```

**Schema Variable Details:**
- **NEXT_PUBLIC_DB_SCHEMA**: Determines which database schema to use
  - `tmg_dev` - Development environment (default for local development)
  - `tmg_test` - Testing/staging environment (CI/CD, QA)
  - `tmg_prod` - Production environment (live application)

**Environment-Specific Setup:**

1. **Local Development:**
   ```bash
   NEXT_PUBLIC_DB_SCHEMA=tmg_dev
   ```

2. **CI/CD Testing:**
   ```bash
   NEXT_PUBLIC_DB_SCHEMA=tmg_test
   ```

3. **Production Deployment:**
   ```bash
   NEXT_PUBLIC_DB_SCHEMA=tmg_prod
   ```

**⚠️ Security Notes:**
- Never commit `.env.local` to version control
- Use different Supabase projects or RLS policies to isolate environments
- The service role key should only be used in server-side API routes
- Always validate the schema value on application startup

### Best Practices

#### Working with Multi-Schema Setup

**1. Schema-Aware Database Operations:**
```typescript
// ✅ CORRECT: Supabase client automatically uses the configured schema
const { data } = await supabase.from('leads').select('*');

// ❌ WRONG: Don't hardcode schema names in queries
const { data } = await supabase.from('tmg_dev.leads').select('*');
```

**2. Schema Validation:**
Add schema validation in your application bootstrap:
```typescript
const validSchemas = ['tmg_dev', 'tmg_test', 'tmg_prod'];
const schema = process.env.NEXT_PUBLIC_DB_SCHEMA;

if (!schema || !validSchemas.includes(schema)) {
  throw new Error(`Invalid schema: ${schema}. Must be one of: ${validSchemas.join(', ')}`);
}
```

**3. Migration Workflow:**
```bash
# 1. Create migration in dev
supabase migration new feature_name

# 2. Test in tmg_dev
NEXT_PUBLIC_DB_SCHEMA=tmg_dev npm run dev

# 3. Promote to test
NEXT_PUBLIC_DB_SCHEMA=tmg_test npm run test

# 4. Deploy to production
NEXT_PUBLIC_DB_SCHEMA=tmg_prod npm run build
```

**4. Data Isolation:**
- Each schema maintains separate data
- Use `tmg_dev` for development with test data
- Use `tmg_test` for integration testing
- Use `tmg_prod` for live production data
- Never mix data between schemas

**5. Feature Branch Development:**
- Always use `tmg_dev` schema for feature branches
- Test thoroughly before merging to main
- Ensure migrations are schema-agnostic
- Document schema requirements in PR descriptions

---

## Project Organization & Workflow Guidelines

### 📋 Plans Documentation (CRITICAL)

**Always use the `plans/` folder for project documentation and planning:**

1. **Plan-First Approach:**
   - ALWAYS work from plan documents - never work on individual tasks without a plan
   - All features, changes, and tasks MUST have corresponding plan documentation
   - Search for existing plan documents before starting any work
   - Update plan documents as work progresses

2. **Plan Document Management:**
   - **Location:** All planning documents go in `plans/` folder
   - **Format:** Use descriptive names (e.g., `AUTH_IMPLEMENTATION.md`, `SESSION_MANAGEMENT.md`)
   - **Updates:** When making ANY changes to plans, search for the relevant plan document and update it accordingly
   - **Status Tracking:** Always update progress, completion status, and testing notes in plan documents

3. **Plan Structure Template:**
   ```markdown
   # Feature Name

   ## Status: [Planning/In Progress/Testing/Complete]

   ## Overview
   [Feature description]

   ## Implementation Plan
   - [ ] Task 1
   - [ ] Task 2

   ## Files Changed
   - `path/to/file.tsx` - Description

   ## Testing
   - [ ] Unit tests
   - [ ] Integration tests

   ## Documentation Updated
   - [ ] README
   - [ ] API docs
   ```

4. **Working with Plans:**
   - Before starting: Read relevant plan document thoroughly
   - During work: Reference plan document for implementation details
   - After completion: Update plan document with results and testing status
   - **NEVER** work on simple tasks individually without consulting the plan

### 🧪 Testing Guidelines

**Always use the `tests/` folder for all testing activities:**

1. **Test Organization:**
   - **Location:** All test files go in `tests/` folder
   - **Structure:** Mirror the application structure where possible
   - **Naming:** Use descriptive names (e.g., `auth.test.ts`, `session-management.test.ts`)

2. **Test Writing:**
   - Write test scripts in the `tests/` folder
   - Document test scenarios in plan documents
   - Update test status inside the `tests/` folder only
   - Include test results in plan documentation

3. **Test Types:**
   ```
   tests/
   ├── unit/           # Unit tests
   ├── integration/    # Integration tests
   ├── e2e/           # End-to-end tests
   └── fixtures/      # Test data and fixtures
   ```

4. **Test Status Tracking:**
   - Maintain test status files in `tests/` folder
   - Link test results back to plan documents
   - Never scatter test documentation across the project

### 🗄️ Supabase Operations

**Always use the `supabase/` folder for database operations:**

1. **MCP Server Usage (CRITICAL):**
   - **ALWAYS ask to initiate the Supabase MCP server** before any Supabase operations
   - Use MCP tools for database queries, schema inspection, and migrations
   - Only bypass MCP if it fails or is unavailable
   - Example: "Please initiate the Supabase MCP server to check the database schema"

2. **Supabase Folder Structure:**
   ```
   supabase/
   ├── migrations/     # Database migrations
   ├── functions/      # Edge functions
   ├── seed.sql       # Seed data
   └── config.toml    # Supabase config
   ```

3. **Scripts and Documentation:**
   - Keep all Supabase-related scripts in `supabase/` folder
   - Document database changes in plan documents
   - Never scatter database documentation outside this folder

4. **Migration Workflow:**
   - Create migrations in `supabase/migrations/`
   - Test in `tmg_dev` schema first
   - Update relevant plan document with migration details
   - Document schema changes in plan

### 📁 Documentation Organization

**Keep project documentation organized and centralized:**

1. **Folder Structure:**
   ```
   project-root/
   ├── plans/          # ALL planning documents (REQUIRED)
   ├── tests/          # ALL testing files and status
   ├── supabase/       # ALL database scripts and docs
   ├── docs/           # General documentation
   └── archive/        # Deprecated/unused documentation
   ```

2. **No Loose Documentation:**
   - **NEVER** keep markdown documentation loosely outside of folders
   - All `.md` files must be in appropriate folders
   - Use clear, descriptive folder names
   - Maintain tight coupling of related documents

3. **Archiving Policy:**
   - **DO NOT DELETE** documentation that's no longer needed
   - **ALWAYS** move deprecated docs to `archive/` folder
   - Structure archive by date or feature: `archive/2024-02/old-feature.md`
   - Keep archive organized for future reference

4. **Documentation Placement:**
   - **Planning docs** → `plans/`
   - **Test docs** → `tests/`
   - **Database docs** → `supabase/`
   - **API docs** → `docs/api/`
   - **Architecture docs** → `docs/architecture/`
   - **Deprecated docs** → `archive/`

### 🔗 Tight Coupling Principles

**Keep related files and documentation together:**

1. **Feature Coupling:**
   - Group related components, tests, and docs together
   - Link plan documents to implementation files
   - Reference tests in plan documents
   - Maintain clear relationships between files

2. **Documentation Links:**
   ```markdown
   # In plan document:
   ## Related Files
   - Implementation: `components/auth/SessionManager.tsx`
   - Tests: `tests/integration/session-management.test.ts`
   - Migration: `supabase/migrations/009_user_sessions.sql`
   ```

3. **Cross-References:**
   - Plans should reference implementation files
   - Implementation files should reference plan docs in comments
   - Tests should reference feature plans
   - Migrations should link to relevant plans

### 🔄 Workflow Summary

**Standard workflow for any feature or change:**

1. ✅ **Check for existing plan** in `plans/` folder
2. ✅ **Create or update plan document** if needed
3. ✅ **Request Supabase MCP server** if database work is required
4. ✅ **Implement feature** according to plan
5. ✅ **Write tests** in `tests/` folder
6. ✅ **Update plan document** with progress and results
7. ✅ **Document changes** in appropriate folders
8. ✅ **Archive old docs** instead of deleting

### ⚠️ Critical Reminders

- 🚫 **NO** loose markdown files in project root
- 🚫 **NO** working on tasks without plan documents
- 🚫 **NO** deleting documentation (move to `archive/` instead)
- 🚫 **NO** Supabase operations without requesting MCP server first
- ✅ **ALWAYS** use `plans/` folder for planning
- ✅ **ALWAYS** use `tests/` folder for testing
- ✅ **ALWAYS** use `supabase/` folder for database work
- ✅ **ALWAYS** maintain tight coupling and organization
