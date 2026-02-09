# SAP Digital Manufacturing - Worklist Filter & Sort Extension

A **Core Plugin Extension** for SAP Digital Manufacturing (DM) that adds quick filter buttons and sorting controls to the standard Worklist plugin toolbar.

![SAP DM](https://img.shields.io/badge/SAP-Digital%20Manufacturing-0FAAFF?style=flat&logo=sap)
![UI5](https://img.shields.io/badge/SAPUI5-Extension-F58B00?style=flat)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

## Features

### 🔍 Status Filter Buttons
Quick-access segmented buttons to filter SFCs by status:
- **All** - Show all SFCs
- **New** (401) - Show only new SFCs
- **Queue** (402) - Show only SFCs in queue
- **Active** (403) - Show only active SFCs
- **Hold** (404) - Show only SFCs on hold

### 📊 Sort Controls
- **Sort Dropdown** - Sort by: SFC, Order, Material, Status, Quantity, Due Date
- **Sort Direction Toggle** - Switch between ascending/descending order

### 🧹 Clear Filters
- One-click button to reset all filters and restore the original list view

## Screenshots

The extension adds controls to the Worklist plugin toolbar:

```
[Standard Worklist Toolbar] | [All] [New] [Queue] [Active] [Hold] | [Sort: SFC ▼] [↑↓] [🗑️]
```
<img width="1911" height="398" alt="image" src="https://github.com/user-attachments/assets/715959e5-5a39-4080-b4bf-e78b71927aa4" />

## Installation

### Prerequisites
- SAP Digital Manufacturing subscription
- Access to POD Designer with Custom Plugins permissions
- A POD with the standard Worklist plugin configured

### Step 1: Download the Plugin
Clone or download this repository:
```bash
git clone https://github.com/YOUR_USERNAME/dm-worklist-filter-sort-extension.git
```

### Step 2: Configure POD and Plant

**Important:** Before uploading, update the `designer/components.json` file with your POD name and plant:

```json
{
    "components": [],
    "extensions": [
        {
            "provider": "sap/dm/custom/plugin/worklistfilterandsort/ExtensionProvider",
            "controller": "sap.dm.dme.plugins.worklistPlugin",
            "inclusions": [
                {
                    "pods": ["YOUR_POD_NAME"],    // <-- Update this
                    "plants": ["YOUR_PLANT_ID"]   // <-- Update this
                }
            ]
        }
    ]
}
```

**Examples:**
```json
// Single POD and Plant
"pods": ["CUSTOM_EXECUTION_POD"],
"plants": ["1710"]

// Multiple PODs and Plants
"pods": ["EXECUTION_POD", "WORK_CENTER_POD"],
"plants": ["1710", "1010", "2000"]

// All PODs and Plants (use with caution)
"pods": ["*"],
"plants": ["*"]
```

### Step 3: Create ZIP File

Create a ZIP file containing all the extension files:
```
worklistfilterandsort.zip
├── CreateExtension.js
├── ExtensionProvider.js
├── ExtensionUtilities.js
├── LifecycleExtension.js
├── PluginEventExtension.js
├── PropertyEditorExtension.js
├── designer/
│   └── components.json
└── i18n/
    ├── builder.properties
    ├── builder_en.properties
    ├── i18n.properties
    └── i18n_en.properties
```

**Note:** ZIP the files directly, not the containing folder.

### Step 4: Upload to SAP DM

1. Open **SAP Digital Manufacturing**
2. Navigate to **POD Designer** → **Extensions**
3. Click **Create**
4. **Namespace:** `sap.dm.custom.plugin.worklistfilterandsort`
   
   ⚠️ **Important:** The namespace must be exactly `sap.dm.custom.plugin.worklistfilterandsort`
   
5. Select your ZIP file and upload
6. Verify the extension appears in the list

<img width="1917" height="694" alt="image" src="https://github.com/user-attachments/assets/b222d337-a23f-4dc2-93f4-933898f9aa34" />

### Step 5: Verify Installation

1. Open your POD that contains the Worklist plugin
2. The filter and sort controls should appear automatically in the Worklist toolbar
3. Test the filter buttons and sorting functionality

## How It Works

### Extension Architecture

This is a **Core Plugin Extension** (not a View Plugin). It automatically attaches to the standard Worklist plugin and enhances its toolbar without requiring you to add anything to the POD layout.

```
┌─────────────────────────────────────────────────────┐
│                   POD Layout                         │
├─────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────┐  │
│  │           Standard Worklist Plugin            │  │
│  │  ┌─────────────────────────────────────────┐  │  │
│  │  │ Enhanced Toolbar (via Extension)         │  │  │
│  │  │ [Filters] [Sort] [Direction] [Clear]    │  │  │
│  │  └─────────────────────────────────────────┘  │  │
│  │                                               │  │
│  │  ┌─────────────────────────────────────────┐  │  │
│  │  │         SFC List (filtered/sorted)      │  │  │
│  │  └─────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### Client-Side Filtering

The extension uses **client-side filtering** by controlling row visibility. This approach:
- ✅ Works with the Worklist OData service (which doesn't support server-side status filtering)
- ✅ Provides instant response without network requests
- ✅ Maintains all loaded data for quick filter switching

### File Structure

| File | Description |
|------|-------------|
| `ExtensionProvider.js` | Main entry point, registers all extensions |
| `CreateExtension.js` | Adds filter/sort controls to the toolbar |
| `LifecycleExtension.js` | Handles initialization and cleanup |
| `PluginEventExtension.js` | Responds to worklist events |
| `PropertyEditorExtension.js` | POD Designer configuration support |
| `ExtensionUtilities.js` | Shared filtering and sorting logic |
| `designer/components.json` | Extension registration and POD targeting |
| `i18n/*.properties` | Internationalization files |

## Customization

### Changing Status Codes

The default status codes are:
- 401 = New
- 402 = In Queue  
- 403 = Active
- 404 = On Hold

To modify, edit the `SegmentedButtonItem` keys in `CreateExtension.js`:

```javascript
items: [
    new SegmentedButtonItem({ key: "ALL", text: "All" }),
    new SegmentedButtonItem({ key: "401", text: "New" }),
    // Add or modify status codes here
]
```

### Adding Sort Fields

To add more sort options, modify the `oSortSelect` items in `CreateExtension.js`:

```javascript
items: [
    new Item({ key: "sfc", text: "Sort: SFC" }),
    new Item({ key: "shopOrder", text: "Sort: Order" }),
    // Add more fields here
]
```

## Troubleshooting

### Extension Not Loading

1. **Check Console**: Open browser DevTools (F12) and look for error messages
2. **Verify Namespace**: Must be exactly `sap.dm.custom.plugin.worklistfilterandsort`
3. **Check components.json**: Ensure POD name and plant match your configuration
4. **Verify Worklist Plugin**: Your POD must have the standard Worklist plugin

### Filters Not Working

1. Check browser console for `[WorklistFilterSort]` debug messages
2. Verify the table has data loaded before filtering
3. Check if the status field name matches your data (`statusCode`, `sfcStatus`, etc.)

### Debug Mode

The extension logs debug messages to the browser console. Look for messages prefixed with `[WorklistFilterSort]`:

```
[WorklistFilterSort] ExtensionProvider LOADED
[WorklistFilterSort] CreateExtension.createToolbar: Adding filter controls
[WorklistFilterSort] applyStatusFilter: status=401
[WorklistFilterSort] applyStatusFilter: 5 visible, 20 hidden
```

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-02-09 | Initial release |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Manoel Costa
http://manoelcosta.com/

---

**Disclaimer:** This is a community extension and is not officially supported by SAP. Use at your own discretion.
