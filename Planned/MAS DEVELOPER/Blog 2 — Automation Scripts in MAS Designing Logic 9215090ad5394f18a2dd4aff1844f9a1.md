# Blog 2 — Automation Scripts in MAS: Designing Logic Without Custom Java

Priority: High
Team: Product Design
Status: In progress
Category: MAS DEVELOPER

### 🧾 Blog 2 - Automation Scripts in MAS: Designing Logic Without Custom Java

**Category:** MAS DEVELOPER

---

### Purpose of this blog

Show Maximo developers how to move from custom Java and MBO extensions to **Automation Scripts** as the primary logic layer in MAS, with patterns that survive upgrades and work in SaaS.

---

## 1. From Custom Java to Scripts: What Really Changes

### Old world (7.5 / 7.6):

- Extend MBOs for validation and business rules.
- Write custom Java classes for field logic and events.
- Package code into EARs and deploy to WebSphere.

### MAS world:

- No custom Java in EARs.
- No MBO-class extensions.
- Business logic lives in **Automation Scripts** attached to events, objects, and actions.

<aside>
💡

**Key insight:** In MAS, your "custom code footprint" shrinks into scripts that are easier to review, test, and retire. The job shifts from "Java engineer" to "solution designer who uses scripts as glue."

</aside>

### What IBM Says

According to IBM's official documentation:

> *"Automation scripts are small, targeted pieces of code that can extend the product. An automation script consists of a launch point, variables with corresponding binding values, and the source code."*
> 

The scripting framework:

- Interprets and runs scripts at runtime when target events happen
- Handles attribute modifications, object modifications, and callbacks
- Stores code and configuration in the Maximo database
- Compiles and caches scripts at runtime for performance

---

## 2. Supported Languages and When to Use Them

### MAS Officially Supports:

| Language | Version | Best For |
| --- | --- | --- |
| **Jython** | 2.7.2 | Familiar to Maximo developers, great for MBO manipulation |
| **JavaScript (Nashorn)** | Ships with JDK | Aligns with modern web ecosystems |

<aside>
📘

**IBM Note:** Maximo scripting is based on the **JSR 223 specification** (Java 6), allowing Maximo to host compliant script engines. While JRuby/Groovy can theoretically be added, IBM only officially tests and supports Jython and Nashorn JavaScript.

</aside>

### Language Selection Criteria:

- **Choose Python (Jython)** when: Working with complex MBO relationships, existing team has Python skills, need robust string manipulation
- **Choose JavaScript** when: Team has web development background, need JSON parsing capabilities, aligning with front-end skills

<aside>
⚠️

**Performance Note from IBM:** Avoid the Mozilla compatibility script for Nashorn. Using it can result in poor performance in Java 8+. Nashorn performs better natively than Rhino did.

</aside>

---

## 3. The Scripting Framework Architecture

### Core Components (Per IBM Documentation):

- **Launch Points**

Launch points define the execution context for a script. They specify *when* your code runs.

- **Variables and Bindings**

Variables determine how information passes into or out of a script. Types include:

- **IN** - Pass by value (read-only)
- **INOUT** - Pass by reference (read/write)
- **OUT** - Output only (write)
- **Source Code**

Written in Jython or JavaScript, compiled to Java bytecode and cached at runtime.

### How Scripts Execute

```
Design Time:
Identify Component → Create Launch Point → Bind Variables → Author Script → Commit

Runtime:
Event Triggers → Framework Loads Cached Bytecode → Script Executes → Results Applied
```

<aside>
🔑

**Key Benefit:** When you commit a script, the framework compiles and caches it immediately. No server restarts, no EAR redeployments, no downtime required.

</aside>

---

## 4. Launch Point Types: Choosing the Right Trigger

### IBM-Documented Launch Point Types:

#### 1. Object Launch Point

- **Events:** Initialize, Add, Update, Delete
- **Use for:** Calculated fields, save-point validations, conditional defaults
- **Access:** Current MBO via implicit `mbo` variable

```python
# Example: Set spare parts quantity on Asset initialization
sptqt_readonly = True
if qtys is not None:
    sptqt = sum(qtys)
```

#### 2. Attribute Launch Point

- **Events:** Initialize Value, Validate, Run Action
- **Use for:** Field validations, crossover logic, real-time calculations
- **Access:** Modified attribute available as implicit variable

```python
# Example: Set vendor required based on purchase price
if purchaseprice >= 100:
    vend_required = True
else:
    vend_required = False
rc = purchaseprice / 2
```

#### 3. Action Launch Point

- **Triggered by:** Workflows, Escalations, UI menus/buttons
- **Use for:** Batch operations, scheduled tasks, workflow actions

#### 4. Custom Condition Launch Point

- **Use for:** Workflow conditions, Conditional UI logic
- **Output:** `evalresult` boolean variable

```python
# Example: Condition for workflow
if vend is not None and qtys is not None and sum(qtys) > 10:
    evalresult = True
```

#### 5. Integration Launch Points

- **Publish Channel Event Filter:** Invoked before MBO serialization
- **User Exit Scripting:** For outbound message handling
- **Object Structure Query:** Custom API filtering

<aside>
⚡

**Performance Tip from IBM:** Use Attribute Launch Points for attribute value initialization instead of Object Launch Point init events. The OLP init script runs for every MBO in a MboSet, even if the attribute is never displayed. Attribute Launch Points only trigger when the attribute is actually referenced.

</aside>

---

## 5. Implicit Variables: The Framework's Hidden Power

### Always-Available Implicit Variables:

| Variable | Type | Description |
| --- | --- | --- |
| `app` | String | Maximo application name |
| `user` | String | Current user name |
| `mbo` | Mbo | Current MBO in context |
| `mboname` | String | Name of current MBO |
| `interactive` | Boolean | True if UI session, False if background |
| `onadd` | Boolean | True if MBO is being added |
| `onupdate` | Boolean | True if MBO is being updated |
| `ondelete` | Boolean | True if MBO is being deleted |
| `scriptName` | String | Name of executing script |
| `launchPoint` | String | Name of launch point |

### Attribute-Based Implicit Variables:

For a variable `var` bound to an MBO attribute:

| Implicit | Type | Description |
| --- | --- | --- |
| `var_required` | Boolean | Required flag (modifiable) |
| `var_readonly` | Boolean | Read-only flag (modifiable) |
| `var_hidden` | Boolean | Hidden flag (modifiable) |
| `var_internal` | Same as var | Internal value for synonym domains |
| `var_previous` | Same as var | Value before modification |
| `var_initial` | Same as var | Value at MBO initialization |
| `var_modified` | Boolean | Whether attribute was modified |

<aside>
💡

**Example:** To set a field readonly in Java requires: `mbo.setFieldFlag("fieldname", MboConstants.READONLY, true);`

In scripts, simply: `fieldname_readonly = True`

</aside>

---

## 6. IBM Best Practices for Scripting Performance

### Direct from IBM Documentation:

#### ✅ Choose the Correct Launch Point and Event

```python
# BAD: Using Object Launch Point init for attribute initialization
# (runs for every MBO in set)

# GOOD: Using Attribute Launch Point for initialize value
if priority is not None:
    thisvalue = 2 * priority
# Only runs when attribute is actually referenced
```

#### ✅ Avoid Costly Init Events from List Tab

```python
from psdi.common.context import UIContext

if UIContext.getCurrentContext() is not None and UIContext.isFromListTab() == False:
    # costly initialization logic here
    pass
```

#### ✅ Cache MboSet Count Calls

```python
# BAD: Multiple count() calls hit database each time
if mboset.count() <= 1:
    service.log("skipping this as count is " + mboset.count())

# GOOD: Store count in variable
cnt = mboset.count()
if cnt <= 1:
    service.log("skipping this as count is " + str(cnt))
```

#### ✅ Check Logging Before Expensive Operations

```python
# BAD: count() called even when logging disabled
service.log("count of mbos " + str(mboset.count()))

# GOOD: Check first
if service.isLoggingEnabled():
    service.log("count of mbos " + str(mboset.count()))
```

#### ✅ Clean Up Standalone MboSets

```python
# MboSets from MXServer.getMXServer().getMboSet() must be cleaned up
try:
    mboset = MXServer.getMXServer().getMboSet("WORKORDER", userInfo)
    # ... operations ...
finally:
    mboset.cleanup()
```

#### ✅ Avoid Conflicting Launch Point Scripts

> *"The scripting framework allows you to attach multiple scripts to the same launch point event... Since the Maximo event topic is an unordered map, the events are triggered without a fixed order."* — IBM Documentation
> 

**Solution:** Combine related scripts or ensure no order dependencies exist.

#### ❌ Never Call Save Mid-Transaction

```python
# DANGEROUS: Causes transaction and event issues
mboset.save()  # Don't do this inside a script!

# CORRECT: Let the encompassing transaction handle saves
# Or explicitly add to transaction:
mbo.getMXTransaction().add(newly_created_mboset)
```

---

## 7. Error Handling: The Maximo Way

### Using Implicit Error Variables:

```python
def setError(prefix):
    global errorkey, errorgroup, params
    errorkey = 'invalidassetprefix'
    errorgroup = 'asset'
    params = [prefix, assettype]

if atype_internal == 'FACILITIES' and not anum.startswith('FT'):
    setError('FT')
elif atype_internal == 'FLEET' and not anum.startswith('FL'):
    setError('FL')
```

<aside>
⚠️

**Important:** Setting `errorgroup` and `errorkey` does **not** immediately throw an exception. The script continues executing. The framework throws the exception *after* script completion. Structure your code accordingly with proper else blocks.

</aside>

### Using MXException Directly:

```python
from psdi.util import MXApplicationException

if condition_failed:
    params = [prefix, assettype]
    raise MXApplicationException('asset', 'invalidassetprefix', params)
```

---

## 8. Library Scripts: Modular Development

### Creating Reusable Code:

Library scripts are reusable pieces of code that automation scripts can invoke. They enable:

- Code reuse across multiple launch points
- Centralized business logic
- Easier maintenance and testing

```python
# In library script "MYLIB"
def calculate_priority(asset_criticality, work_type):
    if asset_criticality == 'HIGH' and work_type == 'CM':
        return 1
    elif asset_criticality == 'HIGH':
        return 2
    else:
        return 3

# In automation script
from MYLIB import calculate_priority
priority = calculate_priority(criticality, wotype)
```

<aside>
📘

**IBM Note:** Library scripts must be hosted on the same system. Avoid accessing the script cache directly from automation script code as it can cause circular dependencies and instability.

</aside>

---

## 9. MAS 9.x Specific Enhancements

### New in MAS 9.0+:

- **Java 17 Support:** Ensure all scripts are tested for Java 17 compatibility
- **UI Bean Scripting:** Link customization logic directly with UI events
- **Enhanced IMGLIB Framework:** Use automation scripts with Integration Framework endpoint handlers for custom storage
- **REST API for Scripts:** Deploy and manage scripts programmatically via `/script/` endpoints

### Testing Checklist for MAS 9 Migration:

- [ ]  Test all scripts with Java 17 (no compatibility mode)
- [ ]  Verify no deprecated Rhino JavaScript syntax
- [ ]  Check import statements for removed packages
- [ ]  Validate integration scripts with new API patterns
- [ ]  Test performance under MAS container environment

---

## 10. Debugging and Logging

### Setting Up Script Logging:

1. Set the `autoscript` logger to DEBUG level
2. Set individual script log levels in the wizard
3. Optionally redirect to dedicated log file

### What Gets Logged at DEBUG Level:

- Launch point and script names about to execute
- Script execution time (start to end)
- Application name, user, MBO name, unique ID
- All variable values passed into the script

### Creating a Dedicated Script Log:

1. Go to **Logging** application
2. **Select Action → Manage Appenders**
3. Create new appender with `MXFileAppender` class
4. Associate only with `autoscript` logger
5. Apply settings

```python
# Debug statements in scripts
print("iplr=" + str(iplr))
print("calculated value=" + str(y))
```

---

## 11. Migration Checklist: Java to Scripts

### Step-by-Step Approach:

1. **Inventory** all Java customizations
    - MBO extensions
    - Field class overrides
    - Custom actions
    - Integration handlers
2. **Classify** by launch point type
    - Validation logic → Attribute/Object Launch Points
    - Workflow actions → Action Launch Points
    - Conditions → Condition Launch Points
    - Integration → Integration Launch Points
3. **Prioritize** migration candidates
    - Start with simple validations
    - Move to calculated fields
    - Then complex business rules
4. **Retire** unnecessary customizations
    - Many historic workarounds are now OOTB features
    - Question every customization's current relevance
5. **Test** thoroughly
    - UI and API paths
    - Interactive and background contexts
    - Performance under load

---

## 12. Final Takeaways for Developers

<aside>
🎯

**The MAS Developer Mindset:**

- Use Automation Scripts as your **default** customization mechanism
- Write small, focused scripts with clear names and responsibilities
- Prefer configuration (domains, conditions) over heavy scripting
- Retire as many legacy Java customizations as you can during migration
- Always consider how a script behaves in **SaaS and upgrade** scenarios
</aside>

### Quick Reference Card:

| Old Pattern | New Pattern |
| --- | --- |
| Extend MBO class | Object Launch Point |
| Override field class | Attribute Launch Point |
| Custom Java action | Action Launch Point |
| Java condition class | Condition Launch Point |
| Database triggers | Automation Scripts |
| Custom EAR deployment | Script saved to database |

---

## 📚 IBM Resources

- [IBM Automation Scripts Documentation](https://www.ibm.com/docs/en/masv-and-l/maximo-manage/cd?topic=administering-automation-scripts)
- [Scripting Best Practices](https://www.ibm.com/docs/en/masv-and-l/maximo-manage/cd?topic=scripts-scripting-best-practices)
- [IBM Maximo Autoscript Guide](https://ibm-maximo-dev.github.io/maximo-autoscript-documentation/)
- [IBM Support - Scripting with Maximo](https://www.ibm.com/support/pages/scripting-maximo)
- [Maximo Automation Scripting Training (MAX4337G)](https://www.ibm.com/training/course/maximo-application-suite-manage-automation-scripting-MAX4337G)

---

### Next Actions You Can Take

- Pick 3-5 existing Java customizations and sketch how they would look as scripts
- Define a simple internal standard for script naming and structure
- Review IBM's best practices document for performance optimization
- Plan a code review session focused only on Automation Scripts for MAS
- Set up dedicated script logging for development environments

---

**Series:** MAS Developer | **Part 2 of 6**

**Next:** Blog 3 — API-First Integrations in MAS →