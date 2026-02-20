# IBM Maximo Visual Inspection (MVI) - Comprehensive Research Report

**Research Date:** 2026-02-20
**Researcher:** Ava Sterling (ClaudeResearcher)
**Purpose:** Technical deep-dive for blog series rewrite

---

## 1. IBM Maximo Visual Inspection Features & Capabilities

### Core Platform Description

IBM Maximo Visual Inspection (MVI) is a machine-learning application within the IBM Maximo Application Suite (MAS) that uses built-in deep learning models to analyze images and video streams for classification, object detection, and action recognition.

### No-Code Training

MVI provides an intuitive, no-code interface that allows quality control teams, engineers, and technicians to train, deploy, and manage AI-powered vision models without coding or deep learning expertise. The platform handles:

- Data labeling (manual and auto-labeling)
- Data augmentation (automated image enrichment)
- Model training with configurable hyperparameters
- One-click deployment
- Real-time inference monitoring

### Supported Model Types & Deep Learning Architectures

| Model Type | Architecture | Use Case | Notes |
|---|---|---|---|
| **Image Classification** | GoogLeNet (Inception) | Categorize entire images (e.g., defective vs. non-defective) | System default for classification |
| **Object Detection - Faster R-CNN** | Faster R-CNN | Accuracy-optimized object detection | Default for object detection |
| **Object Detection - YOLO v3** | YOLO v3 | Speed-optimized real-time detection | Good balance of speed/accuracy |
| **Object Detection - Tiny YOLO v3** | Tiny YOLO v3 | Fastest detection, lower accuracy | Reduced GPU usage, edge-friendly |
| **Object Detection - Detectron2** | Detectron2 | Polygon-labeled objects, small objects | Supports instance segmentation |
| **Object Detection - High Resolution** | Custom | High-resolution imagery analysis | Designed for detailed imagery |
| **Object Detection - SSD** | Single Shot Detector | Real-time inference | **Training unsupported from v9.1 onward** |
| **Object Detection - Anomaly Optimized** | Custom | Detecting anomalous/unusual objects | Specialized anomaly detection |
| **Image Segmentation** | Detectron2 / FRCNN+MRCNN | Pixel-level object identification | Instance segmentation with polygon labels |
| **Action Detection** | Structured Segment Network (SSN) | Video-based action/motion detection | Uses spatial and temporal data |
| **Custom Models** | User-defined (TensorFlow/Python) | Specialized use cases | **Discontinued after v8.7** |

### Model Export & Deployment Formats

| Format | Supported Models | Purpose |
|---|---|---|
| **TensorRT** | Most object detection models (not Detectron2, High-res, SSN, Anomaly) | GPU-accelerated inference |
| **Core ML** | GoogLeNet, YOLO v3, Tiny YOLO v3 | iOS/iPadOS device deployment |
| **Edge Deployment** | Most models | MVI Edge inference |

### Key Platform Features

- **Transfer Learning**: Supported across most architectures (except SSN and Custom models)
- **Multi-GPU Training**: Available for all models except SSN and Custom
- **Training Visualization**: Real-time accuracy monitoring during training with auto-detection of overfitting/underfitting
- **Auto-labeling**: Train on 5-10 manually labeled images, then use the model to auto-label remaining dataset
- **Configurable Hyperparameters**: Advanced settings toggle exposes max_iter, test_iter, test_interval, learning_rate (e.g., default: max_iter=1500, test_iter=100, test_interval=20, learning_rate=0.001)

**Sources:**
- [IBM MVI Models & Supported Functions](https://www.ibm.com/docs/en/masv-and-l/maximo-vi/cd?topic=overview-models-supported-functions)
- [IBM Developer - MVI](https://developer.ibm.com/components/maximo-visual-inspection/)
- [IBM MVI Documentation](https://www.ibm.com/docs/en/masv-and-l/maximo-vi/cd?topic=overview)

---

## 2. MVI Edge Deployment Requirements

### Hardware Architecture

MVI Edge is a separate deployment that runs on edge devices close to cameras and data sources. It connects with high-resolution cameras, drones, and IoT devices to perform automated image analysis at multiple locations.

### GPU Requirements

**Minimum GPU memory: 16 GB per GPU**

MVI uses CUDA and **only supports NVIDIA GPUs**. From version 9.0, CUDA 11.8 or higher is required.

#### Supported GPU Devices (Complete Table)

| GPU Device | Architecture | Compute Capability | Min MVI Version (x86) |
|---|---|---|---|
| NVIDIA H100, etc. | **Hopper** | 9.0 | v9.0+ |
| NVIDIA Ada (RTX 4000 series, L40, etc.) | **Ada Lovelace** | 8.9 | v9.0+ |
| NVIDIA A10, A16, A40, Quadro, GeForce | **Ampere** | 8.6 | v8.8+ |
| NVIDIA A30, A100 | **Ampere** | 8.0 | v8.8+ |
| NVIDIA T4, Quadro, GeForce | **Turing** | 7.5 | v8.8+ |
| NVIDIA V100, Quadro GV100, TITAN V | **Volta** | 7.0 | v8.8+ |
| NVIDIA Tesla P4/P40, Quadro, GeForce | **Pascal** | 6.1 | v8.8+ |
| NVIDIA Tesla P100, Quadro GP100 | **Pascal** | 6.0 | v8.8+ |

**IMPORTANT**: Kepler GPUs (compute capability 3.5/3.7, e.g., Tesla K20/K40/K80) are **no longer supported from MVI v9.0 onward**.

### NVIDIA Jetson Support

- **NVIDIA Jetson Xavier NX** is supported with nvidia-jetpack 4.5.1-b17
- Edge deployment on Jetson devices for inference at the edge

### Software Prerequisites

- Docker and nvidia-docker2 must be installed (GPU mode)
- CPU-only mode available (without nvidia-docker2)
- Minimum 75 GB storage in /var for Docker images
- Minimum 40 GB PVC storage for datasets and models

### Edge Architecture

- MVI Edge runs as Docker containers on edge hardware
- Connects to MVI Server for model download and deployment
- Supports MQTT broker integration for alert messages
- Supports Twilio integration for SMS notifications
- Multiple cameras/input sources per edge device (with capacity limits per GPU)

**Sources:**
- [IBM MVI Supported GPUs](https://www.ibm.com/docs/en/masv-and-l/maximo-vi/cd?topic=gpus-supported-gpu-devices)
- [Planning for MVI Edge](https://www.ibm.com/docs/en/maximo-vi/8.3.0?topic=edge-planning)
- [MVI Edge Planning v8.5](https://www.ibm.com/docs/en/masv-and-l/maximo-vi/8.5.0?topic=edge-planning)

---

## 3. MVI Mobile (iOS/iPadOS) Capabilities

### Platform Support

**iOS and iPadOS ONLY** - There is no Android version. MVI Mobile is a native Apple application available on the App Store.

### Key Features

1. **Real-time Inferencing**: Uses device's integrated camera for live visual inspection
2. **Core ML Model Deployment**: Runs Core ML models exported from MVI Server locally on-device
3. **Offline Capability**: Models deployed to device can run inference without network connectivity
4. **Configurable Business Rules**: Apply rules to inspection results to determine actions/alerts
5. **Reporting Dashboard**: Integrated analytics for inspection performance insights
6. **Supervisor Mode**: Remote management of MVI Mobile apps running on other devices
7. **Point-and-Click Training**: Train complex computer vision models in hours and deploy to device

### Supported Model Exports to Mobile

Only three model types support Core ML export for iOS deployment:
- GoogLeNet (image classification)
- YOLO v3 (object detection)
- Tiny YOLO v3 (object detection)

### Integration

- MVI Mobile connects to MVI Server (v1.3+) for model synchronization
- IBM Service Software Inspector Portable 1.0 also leverages Core ML from MVI

**Sources:**
- [IBM MVI Mobile - App Store](https://apps.apple.com/us/app/ibm-maximo-visual-inspection/id1486600972)
- [IBM MVI Mobile Product Page](https://www.ibm.com/products/ibm-maximo-visual-inspection/mobile)
- [MVI Mobile Integration Docs](https://www.ibm.com/docs/en/maximo-vi/1.3.0?topic=integrating-maximo-visual-inspection-mobile)

---

## 4. Model Training Details

### Training Types

| Type | Description | Input | Output |
|---|---|---|---|
| **Image Classification** | Categorize entire images | Images with category labels | Category + confidence score |
| **Object Detection** | Locate and identify objects | Images with bounding box labels | Bounding boxes + categories + confidence |
| **Image Segmentation** | Pixel-level identification | Images with polygon labels | Pixel masks per object instance |
| **Action Detection** | Detect actions in video | Video with temporal action tags | Action labels with time ranges |

### Dataset Recommendations

- **Minimum viable start**: 5-10 manually labeled images, then use auto-labeling to bootstrap
- **Best practice**: Use iterative approach - train, auto-label, review, retrain
- **Variety**: Include diverse angles, lighting conditions, scales
- **Consistency**: Label consistently across all images for better performance

### Built-in Data Augmentation

MVI provides automatic data augmentation with the following filters:
- **Blur** - Gaussian blur variations
- **Sharpen** - Edge enhancement
- **Crop** - Random/strategic cropping
- **Rotate** - Rotation transformations
- **Vertical Flip** - Mirror vertically
- **Horizontal Flip** - Mirror horizontally
- **Color** - Color/brightness adjustments
- **Noise** - Add noise for robustness

Augmentation can be applied to both images and video frames, significantly reducing the need for large labeled datasets.

### Training Monitoring

- Real-time visualization of training accuracy mid-process
- Automatic overfitting/underfitting detection with early warnings
- Ability to stop, retrain, and restart based on observed accuracy

### Configurable Hyperparameters (Advanced Settings)

| Parameter | Description | Example Default |
|---|---|---|
| max_iter | Maximum training iterations | 1500 |
| test_iter | Number of test iterations | 100 |
| test_interval | Interval between tests | 20 |
| learning_rate | Learning rate | 0.001 |

**Sources:**
- [IBM MVI Data Set Considerations](https://www.ibm.com/docs/en/mas-cd/maximo-vi/continuous-delivery?topic=sets-data-set-considerations)
- [IBM MVI Augmentation Settings](https://www.ibm.com/docs/en/masv-and-l/maximo-vi/8.5.0?topic=sets-augmentation-settings)
- [Build & Deploy ML Models with MVI (Medium)](https://medium.com/ibm-data-ai/build-and-deploy-ml-models-using-maximo-visual-inspection-4719f2710538)

---

## 5. Integration with Maximo Manage, Health & Monitor

### MVI Edge to Maximo Monitor Integration

1. **MQTT Alert Pipeline**: MVI Edge sends MQTT alert messages to Maximo Monitor
2. **Automatic Configuration**: Integration auto-configures a generic device type and device gateway
3. **v2 API Integration** (v9.0+): MQTT messages transmitted using v2 APIs for faster alerting
4. **Alert Message Templates**: Admins create multiple templates defining MQTT/Twilio message structure
5. **Rule-Based Alerts**: Users configure rules on inspections to send different MQTT messages based on detected objects

### MVI to Maximo Manage Integration

- Inspection results link directly to Maximo Manage for **automatic work order creation**
- Detected defects/anomalies can trigger maintenance workflows
- Visual inspection data feeds into asset health scoring

### MVI to Maximo Health & Predict

- Visual inspection data contributes to asset health scores
- AI-powered actionable notifications for emerging issues
- Integration with predictive maintenance workflows

### Alert Mechanisms

| Method | Description |
|---|---|
| **MQTT** | Real-time alerts to Maximo Monitor and connected systems |
| **Twilio SMS** | Text message notifications for critical findings |
| **Dashboard** | Built-in reporting and notification dashboard |

### Data Flow Architecture

```
Camera/Drone/IoT --> MVI Edge (Inference) --> MQTT Broker --> Maximo Monitor
                                          --> Twilio --> SMS Alerts
                                          --> Maximo Manage --> Work Orders
                                          --> Maximo Health --> Health Scores
```

**Sources:**
- [MVI Edge - Maximo Monitor Integration](https://www.ibm.com/docs/en/masv-and-l/maximo-vi/8.5.0?topic=edge-integrating-maximo-visual-inspection-maximo-monitor)
- [MVI Edge - Monitor Integration (CD)](https://www.ibm.com/docs/en/masv-and-l/maximo-vi/continuous-delivery?topic=edge-integrating-maximo-monitor)
- [IBM MAS Product Description (PDF)](https://pacmug.org/wp-content/uploads/2025/05/MASTALK07PacMUGC25_MAS_ProductDecriptionGuideR9.0_IBM.pdf)

---

## 6. Deployment Architecture (Cloud Pak, SaaS, On-Prem)

### Deployment Options

| Option | Platform | Details |
|---|---|---|
| **SaaS (AWS)** | AWS Marketplace | IBM manages infrastructure, subscription model |
| **SaaS (IBM Cloud)** | IBM Cloud Satellite | Automated deployment via Terraform |
| **On-Premises** | Red Hat OpenShift | Self-managed with GPU nodes |
| **Azure** | Azure Red Hat OpenShift | Microsoft-hosted OpenShift |
| **Client-Managed** | RHOCP (any cloud/on-prem) | Customer manages OpenShift cluster |

### OpenShift Requirements

- **Minimum OpenShift version**: 4.8.22 (for GPU operator support)
- **NVIDIA GPU Operator** must be installed on the OpenShift cluster
- At least one worker node with NVIDIA GPU devices required
- Cloud Pak for Data (CP4D) alignment required for full MVI functionality

### Cluster Sizing

| Environment | Master Nodes | Worker Nodes | Notes |
|---|---|---|---|
| **Production (HA)** | 3 | 2+ (with GPU) | High availability required |
| **Development** | 1 (SNO) | 1+ | Single Node OpenShift possible |

### GPU Node Requirements

- Recommended Azure VM types: **NCv3** (V100) and **NCasT4_v3** (T4)
- GPU nodes are required for ML training workloads
- GPU-accelerated nodes must be configured before MVI deployment

### Storage Requirements

- Minimum 75 GB in /var for Docker images (Edge)
- Minimum 40 GB PVC storage for datasets and models
- Additional storage for inspection data retention

**Sources:**
- [Deploy MAS on Azure (Microsoft Learn)](https://learn.microsoft.com/en-us/azure/architecture/example-scenario/apps/deploy-ibm-maximo-application-suite)
- [AWS Marketplace - MAS Inspection Essentials](https://aws.amazon.com/marketplace/pp/prodview-ydz7j2uxpupvu)
- [MVI Application Requirements (IBM)](https://www.ibm.com/docs/en/mas-cd/continuous-delivery?topic=requirements-maximo-visual-inspection)

---

## 7. Real-World Use Cases & ROI

### Industry Verticals

| Industry | Use Cases |
|---|---|
| **Manufacturing** | Production line defect detection, quality control, machinery wear monitoring |
| **Utilities** | Stormwater infrastructure inspection, grid asset monitoring |
| **Oil & Gas** | Pipeline inspection, equipment condition monitoring |
| **Transportation** | Rail system inspection, vehicle condition assessment |
| **Infrastructure** | Bridge/concrete surface inspection, structural health monitoring |

### Case Study: Sund & Baelt (Denmark) - Bridge Infrastructure

- **Organization**: Sund & Baelt Holding A/S (operates Great Belt Fixed Link)
- **Use Case**: Concrete surface inspection for bridge infrastructure
- **Results**:
  - Inspection time reduced from **months to days**
  - Projected **15-25% productivity increase** over 5-10 years
  - **>30% reduction** in time from incident identification to repair
  - Projected lifespan extension of Great Belt bridge to **100 years**
  - **750,000 tons of CO2 saved** by extending bridge lifespan

### Case Study: Melbourne Water (Australia) - Stormwater Management

- **Organization**: Melbourne Water
- **Use Case**: Stormwater grate inspection across 14,000 sq km catchment
- **Results**:
  - Expected savings of **thousands of staff hours** annually
  - Cost savings estimated at **tens to hundreds of thousands of dollars per year**
  - IoT camera solution costs **significantly less** than SCADA alternatives
  - Reduced need for onsite inspections

### General ROI Indicators

- Faster inspection cycles (real-time vs. periodic manual)
- Reduced downtime through predictive defect detection
- Lower labor costs for inspection teams
- Improved accuracy over human visual inspection
- Scalability across multiple sites via Edge deployment

**Sources:**
- [Sund & Baelt Case Study (IBM)](https://www.ibm.com/case-studies/sund-and-baelt)
- [Melbourne Water Case Study (IBM)](https://www.ibm.com/case-studies/melbourne-water)
- [MVI Use Cases (Naviam)](https://www.naviam.io/resources/blog/transforming-asset-management-with-ibms-maximo-visual-inspection-mvi)

---

## 8. Licensing & AppPoints

### AppPoints Model

MAS uses a credit-based licensing system called **AppPoints**. Each application and user type requires a specific number of AppPoints. All AppPoints are **Concurrent** - measured by simultaneous active users, not total registered users.

### User Tiers

| Tier | AppPoints per User | Access Level |
|---|---|---|
| **Limited** | 5 | 3 Manage modules + Monitor, Mobile, Assist |
| **Base** | 10 | Broad access to core apps (Manage, Health) |
| **Premium** | 15 | Full access to all apps including Predict, advanced features |

### Key Licensing Details

- **Minimum subscription**: 12 months, non-cancellable
- **Renewal**: Option to renew or terminate at end of term
- Visual Inspection is included in the MAS entitlement (not a separate purchase)
- MVI Mobile may have separate pricing considerations
- Contact IBM Sales (AssetManagement@ibm.com) for custom pricing

### MAS 9.0 Release Lifecycle

- New versions released every **12 months**
- **36 months (3 years)** base support per release
- **12 months (1 year)** initial extended support after base support ends
- **36 months (3 years)** ongoing extended support available

**Sources:**
- [MAS Licensing Guidance (IBM PDF)](https://www.ibm.com/docs/en/SSRHPA_cd/pdf/mas_licensing.pdf)
- [MAS Pricing Page](https://www.ibm.com/products/maximo/pricing)
- [AppPoints Explained (TRM)](https://www.trmnet.com/2021/10/ibm-maximo-new-apppoints-licensing-model-explained/)
- [MVI Mobile Pricing](https://www.ibm.com/products/maximo-visual-inspection-mobile/pricing)

---

## 9. REST API Reference

### Authentication

All API calls require the `X-Auth-Token` header. API keys are generated via the MVI UI and do not expire (but can be revoked).

| Endpoint | Method | Description |
|---|---|---|
| `/api-keys` | GET | Retrieve user's API key |
| `/api-keys` | POST | Generate new API key |
| `/api-keys` | DELETE | Revoke existing API key |

### Dataset Operations

| Endpoint | Method | Description |
|---|---|---|
| `/datasets` | GET | List all datasets (supports filtering, sorting, pagination) |
| `/datasets` | POST | Create new dataset |
| `/datasets/{id}` | GET | Retrieve dataset info |
| `/datasets/{id}` | DELETE | Delete dataset and all associated files |
| `/datasets/action` | POST | Batch operations (delete multiple) |
| `/datasets/import` | POST | Import dataset from zip file |
| `/datasets/{id}/export` | GET | Export dataset as zip |
| `/datasets/{id}/action` | POST | Rename, calculate size, clone, preprocess, autolabel, apply retention |
| `/datasets/{id}/categories` | GET/POST | List or create categories |
| `/datasets/{id}/categories/{cat_id}` | DELETE | Remove category |
| `/datasets/{id}/action-tags` | GET/POST | List or create action tags |

### File Operations

| Endpoint | Method | Description |
|---|---|---|
| `/datasets/{id}/files` | GET | List files (pagination, filtering, querying) |
| `/datasets/{id}/files` | POST | Upload files to dataset |
| `/datasets/{id}/files/{file_id}` | DELETE | Remove file |
| `/datasets/{id}/files/upload/{upload_id}` | POST | Chunked upload |
| `/datasets/{id}/files/{file_id}/download` | GET | Download file as stream |
| `/datasets/{id}/files/{file_id}/thumbnail/download` | GET | Download thumbnail |
| `/datasets/{id}/files/{file_id}/action` | POST | Capture frames, autolabel, change category |
| `/datasets/{id}/files/user-metadata` | GET | Export file metadata as CSV |

### Labeling Operations

| Endpoint | Method | Description |
|---|---|---|
| `/datasets/{id}/files/{file_id}/object-labels` | GET/POST | Get or create object-level labels |
| `/datasets/{id}/files/{file_id}/action-labels` | GET/POST | List or create action labels (video) |
| `/datasets/{id}/files/{file_id}/action-labels/{label_id}` | PUT/DELETE | Update or remove action label |

### Model Training & Deployment

| Endpoint | Method | Description |
|---|---|---|
| `/dnn-script` | GET/POST | List or upload custom inference scripts |
| `/dnn-script/{id}` | GET/PUT/DELETE | Manage specific DNN scripts |

*Note: Additional endpoints for dltasks, trained-models, deployed-models, and projects are available via the API but detailed specifications are version-dependent.*

### Available API Resources (Complete List)

`categories`, `datasets`, `files`, `file-metadata`, `object-tags`, `object-labels`, `dltasks`, `trained-models`, `deployed-models`, `projects`, `users`, `api-keys`, `dnn-script`, `action-tags`, `action-labels`

### Common Query Parameters

| Parameter | Description |
|---|---|
| `limit` | Restrict returned items count |
| `skip` | Pagination offset |
| `sortby` | Sort field (supports DESC) |
| `query` | Advanced filtering (==, !=, >, >=, <, <=) |

### Data Augmentation via API

POST to `/datasets/{id}/action` with:
```json
{
  "detector": "data_augmentation",
  "parameters": {
    "color": true,
    "crop": true,
    "noise": true,
    "rotation": true,
    "sharpness": true,
    "flip": true,
    "blur": true
  },
  "dataset_name": "augmented_dataset"
}
```

### HTTP Response Codes

| Code | Meaning |
|---|---|
| 200 | Successful operation |
| 201 | Successful creation |
| 400 | Invalid input |
| 401 | Authentication failure |
| 404 | Resource not found |
| 422 | Processing error |
| 500 | Server error |

### CLI Tools

IBM provides `vision-tools` (GitHub: [IBM/vision-tools](https://github.com/IBM/vision-tools)) for command-line API interaction using the VAPI_TOKEN environment variable.

**Sources:**
- [MVI REST API Overview](https://www.ibm.com/docs/en/masv-and-l/maximo-vi/cd?topic=overview-rest-apis)
- [MVI API Documentation (v8.5)](https://public.dhe.ibm.com/systems/power/docs/powerai/api850.html)
- [IBM Vision Tools (GitHub)](https://github.com/IBM/vision-tools)
- [MVI Master API (GitHub)](https://github.com/IBM/mas-mvi-master-api)

---

## 10. MAS 9 Visual Inspection - New Features & Changes

### MAS 9.0 Visual Inspection Enhancements

#### New GPU Support

- **NVIDIA Ada Lovelace** and **Hopper** architectures now supported for training and inference
- Requires **CUDA 11.8+** drivers
- **Kepler GPUs dropped** (compute capability 3.5/3.7 no longer supported)

#### GigE Vision Camera Support

- New industrial camera standard support for high-speed data transfer
- Power over Ethernet (PoE) for simplified deployment
- Specifically supports Basler cameras compatible with GigE Vision interface
- Plug-and-play scalability for adding cameras

#### Data Lifecycle Manager (DLM)

- New policy-based management for historical image and video data
- Automated purging of inspection data at scheduled times
- Default data retention policy created during installation
- Configurable retention policies per inspection type
- Data transfer policies for syncing tagged images from Edge to MVI Server

#### Facial Redaction

- Automatic blurring of human faces captured during inspections
- Reduces risk of identity theft and personal information misuse
- Applied to MVI Edge images outside detection bounding boxes

#### Workflow Scalability

- Dataset operations now run in separate HorizontalPodAutoscaler (HPA) scalable pods
- Resolves performance issues with large file uploads and frequent dataset page access
- Dynamic horizontal scaling based on workload

#### GPU Workload Optimization

- Administrators can specify which GPUs handle inference vs. training
- Enables more efficient resource allocation across GPU pool

#### Edge Device Diagnostics

- New dashboard feature for monitoring edge device status
- Run diagnostic reports on individual edge devices
- One report at a time per device

#### Alert Message Templates (Edge)

- Administrators create multiple reusable alert templates
- Templates define MQTT and Twilio message structure/format
- Users select templates when configuring inspections

#### Enhanced Monitor Integration (v2 APIs)

- MQTT messages now transmitted using v2 APIs
- Faster alert delivery within Maximo Monitor
- Improved responsiveness and integration efficiency

#### Runtime Modernization

- Migrated to **Java SE Development Kit 17**
- Running on IBM Semeru Runtime Certified Edition for WebSphere Liberty

### MAS 9.1 Visual Inspection Improvements

- Continued enhancements to image-based inspections
- IT Service Management (ITSM) workflow support
- **SSD training deprecated** (unsupported from v9.1 onward)
- MAS 9.1 released June 24, 2025

### Version Deprecations & Breaking Changes

| Change | Version | Impact |
|---|---|---|
| Kepler GPU support removed | 9.0 | Must upgrade to Pascal or newer |
| Custom models discontinued | 8.7+ | Use built-in architectures or Detectron2 |
| SSD training unsupported | 9.1+ | Use YOLO v3, Faster R-CNN, or other alternatives |

**Sources:**
- [What's New in MVI 9.0 (IBM)](https://www.ibm.com/docs/en/masv-and-l/maximo-vi/cd?topic=new-in-90)
- [MVI Edge 9.0 (Pragma Edge)](https://pragmaedge.com/whats-new-in-maximo-visual-inspection-edge-v9/)
- [MAS 9.0 Release (BPD Zenith)](https://www.bpdzenith.com/news/ibm-announces-the-release-of-ibm-maximo-application-suite-v9.0)
- [MAS 9.1 Release Notes (Pragma Edge)](https://pragmaedge.com/whats-new-in-ibm-maximo-application-suite-9-1/)
- [MVI 9.0 Service Updates (IBM)](https://www.ibm.com/support/pages/ibm-maximo-application-suite-visual-inspection-release-900-service-updates)

---

## Strategic Insights & Second-Order Effects

### Pattern 1: Edge-First Architecture Shift

IBM is clearly moving toward an edge-first architecture. The GigE Vision support, enhanced Edge diagnostics, and Data Lifecycle Manager all point to a future where the majority of inference happens at the edge, with the server becoming primarily a training and model management hub. This has implications for network architecture planning -- organizations should design for intermittent connectivity rather than always-on cloud connections.

### Pattern 2: Industrial Camera Ecosystem Lock-in

The GigE Vision standardization (starting with Basler cameras) signals IBM's intent to create a tighter integration with industrial camera ecosystems. Organizations already using GigE Vision cameras gain immediate value; those using USB or proprietary cameras face migration costs. The second-order effect: this positions MVI as a natural choice for new manufacturing lines designed from scratch.

### Pattern 3: Data Governance Becoming Central

The Data Lifecycle Manager isn't just a storage optimization tool -- it's IBM's response to increasing regulatory pressure around data retention, privacy (facial redaction), and compliance. Organizations deploying MVI will need data governance policies before deployment, not after. This creates consulting and implementation services opportunities.

### Pattern 4: GPU Architecture Evolution Creates Upgrade Pressure

Dropping Kepler support while adding Ada/Hopper creates a clear upgrade path. Organizations on older Tesla K-series hardware face mandatory upgrades to continue receiving support. The window between v8.x (Kepler supported) and v9.0 (Kepler dropped) is a critical migration decision point.

### Pattern 5: iOS-Only Mobile Creates Android Gap

The lack of Android support for MVI Mobile is a significant limitation in mixed-device environments. This either signals IBM's assessment that iOS dominates enterprise device fleets, or represents a gap that third-party partners could fill. For Android-heavy organizations, MVI Edge with cameras may be a more viable path than mobile inspection.

---

## Key Data Points Summary for Blog Content

| Metric | Value | Source |
|---|---|---|
| Minimum GPU memory | 16 GB per GPU | IBM Docs |
| Minimum Docker storage | 75 GB (/var) | IBM Docs |
| Minimum PVC storage | 40 GB | IBM Docs |
| Quick-start labeled images | 5-10 images (with auto-labeling) | IBM Docs |
| Default learning rate | 0.001 | IBM Docs |
| Default max iterations | 1500 | IBM Docs |
| Sund & Baelt productivity gain | 15-25% (projected, 5-10 years) | IBM Case Study |
| Sund & Baelt incident-to-repair reduction | >30% | IBM Case Study |
| Melbourne Water coverage area | 14,000 sq km | IBM Case Study |
| MAS subscription minimum | 12 months | IBM Licensing |
| MAS 9.0 support lifecycle | 36 months base + 12 months extended + 36 months ongoing | IBM Docs |
| CUDA minimum version (v9.0) | 11.8 | IBM Docs |
| AppPoints - Limited User | 5 per concurrent user | IBM Licensing |
| AppPoints - Base User | 10 per concurrent user | IBM Licensing |
| AppPoints - Premium User | 15 per concurrent user | IBM Licensing |
