/**
 * Worklist Filter & Sort Extension Provider
 */
sap.ui.define([
    "sap/dm/dme/podfoundation/extension/PluginExtensionProvider",
    "sap/dm/custom/plugin/worklistfilterandsort/LifecycleExtension",
    "sap/dm/custom/plugin/worklistfilterandsort/CreateExtension",
    "sap/dm/custom/plugin/worklistfilterandsort/PluginEventExtension",
    "sap/dm/custom/plugin/worklistfilterandsort/PropertyEditorExtension",
    "sap/dm/custom/plugin/worklistfilterandsort/ExtensionUtilities"
], function (PluginExtensionProvider, LifecycleExtension, CreateExtension, 
             PluginEventExtension, PropertyEditorExtension, ExtensionUtilities) {
    "use strict";

    console.log("=== WorklistFilterSort ExtensionProvider LOADED ===");

    return PluginExtensionProvider.extend("sap.dm.custom.plugin.worklistfilterandsort.ExtensionProvider", {
        constructor: function () {
            console.log("=== WorklistFilterSort ExtensionProvider CONSTRUCTOR ===");
            this.oExtensionUtilities = new ExtensionUtilities();
            this.oExtensionUtilities.setLogToConsole(true);
        },

        getExtensions: function () {
            console.log("=== WorklistFilterSort getExtensions CALLED ===");
            return [
                new CreateExtension(this.oExtensionUtilities),
                new LifecycleExtension(this.oExtensionUtilities),
                new PluginEventExtension(this.oExtensionUtilities),
                new PropertyEditorExtension(this.oExtensionUtilities)
            ];
        }
    });
});