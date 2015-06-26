import m = require("mithril");
import translate = require("./translate");
import PanelBuilder = require("panelBuilder/PanelBuilder");
import generateRandomUuid = require("../pointrel20150417/generateRandomUuid");

"use strict";

// This defines a gui component which has a grid, some buttons, and a detail panel do display the currently selected item or enter a new item

// TODO: Probably need to prevent user surveys from having a question with a short name of "_id".

// Possible configuration options
/*
var configuration = {
    viewButton: true,
    addButton: true,
    removeButton: true,
    editButton: true,
    duplicateButton: true,
    moveUpDownButtons: true,
    navigationButtons: true,
    includeAllFields: false, // Or ["fieldName1", "fieldName2", ...]
    customButton: {???},
    validateAdd: "methodName",
    validateEdit: "methodName"
};
*/

function computeColumnsForItemPanelSpecification(itemPanelSpecification, configuration) {
    // var self = this;
    
    var columns = [];
    
    if (!itemPanelSpecification) return columns;
    
    var maxColumnCount = 5;
    var columnCount = 0;
    
    var displayTypesToDisplay = {
       text: true,
       textarea: true,
       select: true,
       radiobuttons: true
    };
    
    var fieldsToInclude = [];
    var panelFields = itemPanelSpecification.panelFields;
    
    // Put the columns in the order supplied if using includeAllFields, otherwise put them in order of panel specification
    if (configuration.includeAllFields && configuration.includeAllFields.constructor === Array) {
        configuration.includeAllFields.forEach(function (fieldName) {
            panelFields.forEach(function (fieldSpecification) {
                if (fieldSpecification.id === fieldName) fieldsToInclude.push(fieldSpecification);
            });
        });
    } else {
        panelFields.forEach(function (fieldSpecification) {
            var includeField = false;
            if (configuration.includeAllFields) {
                // TODO: improve this check if need to exclude other fields?
                if (fieldSpecification.displayType !== "label" && fieldSpecification.displayType !== "header") {
                    fieldsToInclude.push(fieldSpecification);
                }
            } else {
                if (columnCount < maxColumnCount) {
                    if (displayTypesToDisplay[fieldSpecification.displayType]) fieldsToInclude.push(fieldSpecification);
                    columnCount++;
                }
            }
        });
    }
    
    fieldsToInclude.forEach(function (fieldSpecification) {
        // console.log("includeField", fieldSpecification);
        var newColumn =  {
            field: fieldSpecification.id,
            label: translate(fieldSpecification.id + "::shortName", fieldSpecification.displayName)
            // formatter: self.formatObjectsIfNeeded.bind(this),
            // sortable: !configuration.moveUpDownButtons
        };
        columns.push(newColumn);
        // console.log("newColumn", newColumn);
    });
    
    return columns;
}

// TODO: This code is not currently used and probably can be removed
function formatObjectsIfNeeded(item) {
    if (_.isString(item)) return item;
    if (item === undefined) return "";
    if (item === null) return "";
    return JSON.stringify(item);
}

// Sorts function derived from: http://lhorie.github.io/mithril-blog/vanilla-table-sorting.html
function sorts(controller: GridWithItemPanel, list) {
    return {
        onclick: function(e) {
            var prop = e.target.getAttribute("data-sort-by");
            if (prop) {
                // Don't sort if have move up/down buttons
                if (controller.gridConfiguration.moveUpDownButtons) return;
                console.log("Sorting by", prop);
                var first = list[0];
                list.sort(function(a, b) {
                    return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
                });
                if (first === list[0]) {
                    console.log("reversing");
                    list.reverse();
                }
                console.log("sorted list", list);
            } else {
                if (controller.isEditing()) return;
                var itemID = e.target.getAttribute("data-item-index");
                console.log("item clicked", itemID);
                var itemIndex = null;
                for (var i = 0; i < list.length; i++) {
                    if (list[i][controller.idProperty] === itemID) {
                        itemIndex = i;
                        break;
                    }
                }
                console.log("found item at index", itemIndex, list[itemIndex]);
                if (itemIndex !== null) {
                    controller.selectedItem = list[itemIndex];
                    controller.displayMode = "viewing";
                }
            }
        }
    };
}

class ItemPanel {
    
    static controller(args) {
        console.log("Making ItemPanel: ", args);
        return new ItemPanel();
    }
    
    static view(controller, args) {
        console.log("ItemPanel view called");
        
        return controller.calculateView(args);
    }
    
    calculateView(args) {
        console.log("%%%%%%%%%%%%%%%%%%% ItemPanel view called");
        // return m("div", "work in progress");
        // TODO: Should provide copy of item?
        var panelBuilder: PanelBuilder = args.panelBuilder;
        // Possible recursion if the panels contain a table
        
        var theClass = "narrafirma-griditempanel-viewing";
        if (args.mode === "edit") {
            theClass = "narrafirma-griditempanel-editing";  
        }
        return m("div", {"class": theClass}, panelBuilder.buildPanel(args.grid.itemPanelSpecification, args.item));

    }
}

// GridWithItemPanel needs to be a component so it can maintain a local sorted list
class GridWithItemPanel {
    
    gridConfiguration = null;
    data = [];
    columns = [];
    fieldSpecification = null;
    itemPanelSpecification = null;
    idProperty: string = "_id";
    model = null;
    panelBuilder: PanelBuilder = null;
    
    // viewing, editing, adding
    displayMode = null;
    
    // TODO: Multiple select
    selectedItem = null;
    
    isNavigationalScrollingNeeded = false;
    
    constructor(args) {
        this.panelBuilder = args.panelBuilder;
        this.model = args.model;
        this.fieldSpecification = args.fieldSpecification;
        
        this.updateDisplayConfigurationAndData(this.fieldSpecification.displayConfiguration);
    }
    
    updateDisplayConfigurationAndData(theDisplayConfiguration) {
        var displayConfiguration = {
            itemPanelID: undefined,
            itemPanelSpecification: undefined,
            gridConfiguration: undefined
        };
        
        var gridConfiguration = {
            idProperty: undefined,
            
            viewButton: true,
            addButton: true,
            removeButton: true,
            editButton: true,
            includeAllFields: false,
            inlineButtons: false,
            navigationButtons: true,
            
            // Flag for whether removing an item then selects the next item after it
            // This flag makes it easy to quickly delete a lot of items, which is maybe not good in some cases
            shouldNextItemBeSelectedAfterItemRemoved: false,
           
            // TODO: Need to make work:
            duplicateButton: false,
            moveUpDownButtons: false,
            customButton: null,
            validateAdd: null,
            validateEdit: null
        };
        
        var itemPanelID = theDisplayConfiguration;
        if (!_.isString(itemPanelID)) {
            displayConfiguration = theDisplayConfiguration;
            itemPanelID = displayConfiguration.itemPanelID;
            if (displayConfiguration.gridConfiguration) {
                gridConfiguration = displayConfiguration.gridConfiguration;
            }
        }
        
        // this.displayConfiguration = displayConfiguration;
        this.gridConfiguration = gridConfiguration;
        
        var itemPanelSpecification = displayConfiguration.itemPanelSpecification;
        if (!itemPanelSpecification && itemPanelID) {
            itemPanelSpecification = this.panelBuilder.getPanelDefinitionForPanelID(itemPanelID);
        }
        
        if (!itemPanelSpecification) {
            console.log("Trouble: no itemPanelSpecification for options: ", this.fieldSpecification);
        }
        
        if (!this.model) {
            console.log("Error: no model is defined for grid", this.fieldSpecification);
            throw new Error("Error: no model is defined for grid");
        }
        
        if (gridConfiguration.idProperty) this.idProperty = gridConfiguration.idProperty;
        
        this.itemPanelSpecification = itemPanelSpecification;
        this.columns = computeColumnsForItemPanelSpecification(itemPanelSpecification, displayConfiguration);
        
        // viewing, editing
        this.displayMode = null;
        
        // TODO: Multiple select
        this.selectedItem = null;
        
        this.isNavigationalScrollingNeeded = false;
        
        this.updateData();
    }
    
    updateData() {
        // TODO: May want to use at or similar to get the value in case this is a plain object?
        var data = this.model[this.fieldSpecification.id];
        
        /*
        var bigData = [];
        for (var i = 0; i < 50; i++) {
            for (var j = 0; j < data.length; j++) {
                var newItem = JSON.parse(JSON.stringify(data[j]));
                newItem[idProperty] = "item_" + (i * data.length + j);
                bigData.push(newItem);
                console.log("newItem", newItem);
            }
        }
        data = bigData;
        */
        
        if (!data) {
            data = [];
            this.model[this.fieldSpecification.id] = data;
        }
        
        // Make a copy of the data because we will be sorting it
        this.data = data.slice();
    }
    
    static controller(args) {
        console.log("Making ItemPanel: ", args);
        return new GridWithItemPanel(args);
    }
    
    static view(controller: GridWithItemPanel, args) {
        console.log("Grid view called");
        
        return controller.calculateView();
    }
    
    calculateView() {
        console.log("GridWithItemPanel calculateView", this.data);
        
        var panelBuilder = this.panelBuilder;
        var prompt = panelBuilder.buildQuestionLabel(this.fieldSpecification);
        
        var columnHeaders = this.columns.map((column) => {
            return m("th[data-sort-by=" + column.field  + "]", {"text-overflow": "ellipsis"}, column.label);
        });
        
        if (this.gridConfiguration.inlineButtons) {
            columnHeaders.push(m("th", ""));
        }
        
        var table = m("table.scrolling", sorts(this, this.data), [
            m("tr", {"class": "selected-grid-row"}, columnHeaders),
            this.data.map((item, index) => {
                return this.rowForItem(item, index);
            })
        ]);
        
        var disabled = this.isEditing() || undefined;
        
        var buttons = [];
        if (this.gridConfiguration.editButton) {
            var addButton = m("button", {onclick: this.addItem.bind(this), disabled: disabled}, translate("#button_Add|Add"));
            buttons.push(addButton);
        }
        
        if (!this.gridConfiguration.inlineButtons) {
            buttons = buttons.concat(this.createButtons(this));
        }
        
        if (this.gridConfiguration.duplicateButton) {
            var duplicateButton = m("button", {onclick: this.duplicateItem.bind(this), disabled: disabled}, translate("#button_Duplicate|Duplicate"));
            buttons.push(duplicateButton);
        }
             
        if (this.gridConfiguration.moveUpDownButtons) {
            var upButton = m("button", {onclick: this.moveItemUp.bind(this), disabled: disabled}, translate("#button_Up|Up"));
            var downButton = m("button", {onclick: this.moveItemDown.bind(this), disabled: disabled}, translate("#button_Down|Down"));
        }
        
        if (this.gridConfiguration.customButton) {
            var options = this.gridConfiguration.customButton;
            var customButtonClickedPartial;
            if (_.isString(options.callback)) {
                var fakeFieldSpecification = {id: this.fieldSpecification.id, displayConfiguration: options.callback, grid: this};
                customButtonClickedPartial = panelBuilder.buttonClicked.bind(panelBuilder, this.model, fakeFieldSpecification);
            } else {
                customButtonClickedPartial = options.callback.bind(null, this);
            }
            var doubleClickFunction;
            if (!this.gridConfiguration.viewButton) {
                doubleClickFunction = customButtonClickedPartial;
            }
            var customButton = m("button", {onclick: customButtonClickedPartial, ondblclick: doubleClickFunction, disabled: disabled}, translate(options.customButtonLabel));
        }
        
        if (this.gridConfiguration.navigationButtons) {
            // TODO: Improve navigation enabling
            var navigationDisabled = this.isEditing() || this.data.length === 0 || undefined;
            buttons.push(m("button", {onclick: this.navigateClicked.bind(this, "start"), disabled: navigationDisabled}, translate("#button_navigateStart|[<<")));
            buttons.push(m("button", {onclick: this.navigateClicked.bind(this, "previous"), disabled: navigationDisabled}, translate("#button_navigatePrevious|<")));
            buttons.push(m("button", {onclick: this.navigateClicked.bind(this, "next"), disabled: navigationDisabled}, translate("#button_navigateNext|>")));
            buttons.push(m("button", {onclick: this.navigateClicked.bind(this, "end"), disabled: navigationDisabled}, translate("#button_navigateEnd|>>")));
        }
        
        var buttonPanel = m("div.narrafirma-button-panel", buttons);
        
        var parts = [prompt, m("div.narrafirm-grid", [table]), buttonPanel];
        
        if (this.isViewing()) {
            parts.push(this.bottomEditorForItem(panelBuilder, this.selectedItem, "view"));
        }
        
        if (this.isEditing()) {
            parts.push(this.bottomEditorForItem(panelBuilder, this.selectedItem, "edit"));
        }
        
        // TODO: set class etc.
        return m("div", {"class": "questionExternal narrafirma-question-type-grid"}, parts);
    }

    isEditing() {
        return (this.displayMode === "editing" || this.displayMode === "adding") && this.selectedItem;
    }
    
    isViewing() {
        return (this.displayMode === "viewing") && this.selectedItem;
    }
    
    validateItem(item) {
        var validationMethodIdentifier = this.gridConfiguration.validateEdit;
        if (this.displayMode === "adding") validationMethodIdentifier = this.gridConfiguration.validateAdd || validationMethodIdentifier;
        if (validationMethodIdentifier) {
            var fakeFieldSpecification = {
                displayConfiguration: validationMethodIdentifier,
                value: item
           };
            var errors = this.panelBuilder.calculateFunctionResult(null, fakeFieldSpecification);
            if (!errors) return [];
            return errors;
        }
        return [];
    }
    
    inlineEditorForItem(panelBuilder, item, mode) {
        return m("tr", [
            m("td", {colSpan: this.columns.length}, [
                m.component(<any>ItemPanel, {panelBuilder: panelBuilder, item: item, grid: this, mode: mode})
            ]),
            m("td", {"vertical-align": "top"}, [m("button", {onclick: this.doneClicked.bind(this, item)}, "close")])
        ]);
    }
    
    bottomEditorForItem(panelBuilder, item, mode) {
        return m("div", [
            m("td", {colSpan: this.columns.length}, [
                m.component(<any>ItemPanel, {panelBuilder: panelBuilder, item: item, grid: this, mode: mode})
            ]),
            m("td", {"vertical-align": "top"}, [m("button", {onclick: this.doneClicked.bind(this, item)}, "close")])
        ]);
    }
    
    newIdForItem() {
        // return new Date().toISOString();
        return generateRandomUuid();
    }
    
    addItem() {
        var newItem = {};
        newItem[this.idProperty] = this.newIdForItem();
        this.data.push(newItem);
        this.selectedItem = newItem;
        this.displayMode = "adding";
    }
    
    deleteItem(item) {
        if (!item) item = this.selectedItem; 
        console.log("deleteItem", item);
        
        // TODO: This needs to create an action that affects original list
        var index = this.data.indexOf(item);
        this.data.splice(index, 1);
        
        if (item === this.selectedItem) {
            this.selectedItem = null;
            
            if (this.gridConfiguration.shouldNextItemBeSelectedAfterItemRemoved) {
                if (index === this.data.length) {
                    index = index - 1;
                }  
                if (this.data.length) {
                    this.selectedItem = this.data[index];
                } else {
                   this.selectedItem = null;
                }
                this.isNavigationalScrollingNeeded = true;
            }
        }
    }
    
    editItem(item) {
        if (!item) item = this.selectedItem;
        console.log("editItem", item);
        
       // TODO: This needs to create an action that affects original list  
        this.selectedItem = item;
        this.displayMode = "editing";
    }
    
    viewItem(item, index) {
        if (!item) item = this.selectedItem;
        console.log("viewItem", item);
        
        this.selectedItem = item;
        this.displayMode = "viewing";
    }
    
    duplicateItem() {        
        console.log("duplicate button pressed");
        
        // TODO: May not need this
        if (this.isEditing) {
            alert("The eidt must be finsihed before duplicating an item");
            return;
        }

        if (!this.selectedItem) {
            alert("Please select an item to duplicate first");
            return;
        }
        
        // Make a copy of the selected item
        var newItem = JSON.parse(JSON.stringify(this.selectedItem));
        
        // Set new id for copy
        newItem[this.idProperty] = this.newIdForItem();
        
        this.data.push(newItem);
        this.selectedItem = newItem;
        this.displayMode = "adding";
    }
    
    moveItemUp() {
        console.log("up button pressed");
        
        // TODO: How to move this change back to project data???
        var index = this.data.indexOf(this.selectedItem);
        if (index <= 0) return;
        this.data[index] = this.data[index - 1];
        this.data[index - 1] = this.selectedItem;
        
        /* Code for moving multiple selections up:
        var items = this.store.data;
        var lastSelectedObjectLocation = -1;
        var idProperty = this.store.idProperty;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item[idProperty] in this.grid.selection) {
                if (lastSelectedObjectLocation < i - 1) {
                    var otherItem = items[i - 1];
                    items[i - 1] = item;
                    items[i] = otherItem;
                    lastSelectedObjectLocation = i - 1;
                } else {
                    lastSelectedObjectLocation = i;
                }
            }
        }
        */
    }
    
    moveItemDown() {
        console.log("down button pressed");
        
        // TODO: How to move this change back to project data???
        var index = this.data.indexOf(this.selectedItem);
        if (index === -1 || index === this.data.length - 1) return;
        this.data[index] = this.data[index + 1];
        this.data[index + 1] = this.selectedItem;
        
        /* code for moving multiple selected items:
        var items = this.store.data;
        var lastSelectedObjectLocation = items.length;
        var idProperty = this.store.idProperty;
        for (var i = items.length - 1; i >= 0; i--) {
            var item = items[i];
            if (item[idProperty] in this.grid.selection) {
                if (lastSelectedObjectLocation > i + 1) {
                    var otherItem = items[i + 1];
                    items[i + 1] = item;
                    items[i] = otherItem;
                    lastSelectedObjectLocation = i + 1;
                } else {
                    lastSelectedObjectLocation = i;
                }
            }
        }
        */
    }
    
    doneClicked(item) {
        // TODO: Should ensure the data is saved
        if (this.isEditing) {
            var errors = this.validateItem(item);
            if (errors.length) {
                // TODO: Translate
                alert("The are validation errors:\n" + errors);
                return;
            }
        }
        // Leave item selected: this.selectedItem = null;
        this.displayMode = null;
    }
    
    navigateClicked(direction: string) {
        if (this.data.length === 0) return;
        var newPosition;
        switch (direction) {
            case "start":
                newPosition = 0;
                break;
            case "previous":
                newPosition = this.data.indexOf(this.selectedItem);
                if (newPosition === -1) newPosition = 0;
                if (newPosition > 0) newPosition--;
                break;
            case "next":
                newPosition = this.data.indexOf(this.selectedItem);
                if (newPosition < this.data.length - 1) newPosition++;
                break;
            case "end":
                newPosition = this.data.length - 1;
                break;
            default:
               throw new Error("Unexpected direction: " + direction);
        }
        this.selectedItem = this.data[newPosition];
        this.isNavigationalScrollingNeeded = true;
    }
    
    createButtons(item = null) {
        var buttons = [];
       
        var disabled = this.isEditing() || (!item && !this.selectedItem) || undefined;
         
        if (this.gridConfiguration.removeButton) {
            var removeButton = m("button", {onclick: this.deleteItem.bind(this, item), disabled: disabled, "class": "fader"}, translate("#button_Remove|Remove"));
            buttons.push(removeButton);
        }

        if (this.gridConfiguration.editButton) {
            var editButton = m("button", {onclick: this.editItem.bind(this, item), disabled: disabled, "class": "fader"}, translate("#button_Edit|Edit"));
            buttons.push(editButton);
        }
        
        if (this.gridConfiguration.viewButton) {
            var viewButton = m("button", {onclick: this.viewItem.bind(this, item), disabled: disabled, "class": "fader"}, translate("#button_View|View"));
            buttons.push(viewButton); 
        }
        
        // console.log("made buttons", buttons, item);
        return buttons;
    }
    
    rowForItem(item, index) {
        /*
        if (this.selectedItem === item) {
            return m("tr", [
                m("td", {colSpan: this.columns.length}, [
                    m.component(<any>ItemPanel, {panelBuilder: panelBuilder, item: item, grid: this})
                ]),
                m("td", {"vertical-align": "top"}, [m("button", {onclick: this.doneClicked.bind(this, item, index)}, "close")])
            ]);
        }
        */
        var selectionClass = "narrafirma-grid-row-unselected";
        var selected = (item === this.selectedItem);
        if (selected) selectionClass = "narrafirma-grid-row-selected";
        
        var fields = this.columns.map((column) => {
            return m("td", {"text-overflow": "ellipsis", "data-item-index": item[this.idProperty] }, item[column.field]);
        });
        
        if (this.gridConfiguration.inlineButtons) {
            var buttons = this.createButtons(item);
            
            fields = fields.concat(m("td", {nowrap: true}, buttons));
        }
        // TODO: Probably more efficient way to ensure table row is visible like by doing config just for entire table
        return m("tr", {key: item[this.idProperty], "class": selectionClass, config: this.ensureTableRowIsVisibleConfig.bind(this, item)}, fields);
    }
    
    ensureTableRowIsVisibleConfig(item, element: HTMLElement, isInitialized: boolean, context: any, vdom: _mithril.MithrilVirtualElement) {
        // Ensure the selected item is visible in the table
        // TODO: Could improve this so when navigating down the item is still near the bottom
        if (this.isNavigationalScrollingNeeded && this.selectedItem === item) {
            if (!isElementInViewport(element.parentNode, element)) {
                var rowPosition = element.offsetTop;
                element.parentElement.scrollTop = rowPosition;
            }
            this.isNavigationalScrollingNeeded = false;
        }
    }    
}

function isElementInViewport(parent, element) {
    var elementRect = element.getBoundingClientRect();
    var parentRect = parent.getBoundingClientRect();
    return (
        elementRect.top >= parentRect.top &&
        elementRect.left >= parentRect.left &&
        elementRect.bottom <= parentRect.bottom &&
        elementRect.right <= parentRect.right
    );
}

export = GridWithItemPanel;