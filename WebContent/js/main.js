"use strict";

require([
    "dojo/_base/array",
    "dojox/mvc/at",
    "dojo/_base/connect",
    "js/domain",
    "dojo/dom-construct",
    "dojo/dom-style",
    "dojo/hash",
    //"js/page_design-questions",
    //"js/page_export-survey",
    //"js/page_graph-results",
    //"js/page_take-survey",
    "js/pages",
    "js/question_editor",
    "js/widgets",
    "dijit/layout/ContentPane",
    "dijit/form/Select",
    "dojo/domReady!"
], function(
    array,
    at,
    connect,
    domain,
    domConstruct,
    domStyle,
    hash,
    //page_designQuestions,
    //page_exportSurvey,
    //page_graphResults,
    //page_takeSurvey,
    pages,
    questionEditor,
    widgets,
    ContentPane,
    Select
){
    // TODO: Add page validation
    // TODO: Add translations for GUI strings used here
    
    var currentPage = null;
    var currentPageID = null;
    var selectWidget = null;
    var previousPageButton = null;
    var nextPageButton = null;
    var startPage = "page_dashboard";
    
    function urlHashFragmentChanged(newHash) {
        // console.log("urlHashFragmentChanged", newHash);
        if (currentPageID !== newHash) {
            if (domain.pageDefinitions[newHash]) {
                changePage(newHash);
            } else {
                console.log("unsupported url hash fragment", newHash);
            }
        }
    }
    
    function changePage(id) {
        selectWidget.set("value", id);
    }
    
    function mainSelectChanged(event) {
        var id = event;
        console.log("changing page to:", id);
        showPage(id);
    }
    
    function showPage(id) {
        if (currentPageID === id) return;
        
        var page = domain.pageDefinitions[id];
        if (!page) {
            console.log("no such page", id);
            alert("No such page: " + id);
            return;
        }
        
        domStyle.set("pageDiv", "display", "none");
        // domStyle.set("startup", "display", "block");
        
        if (currentPageID && currentPage) {
            // domStyle.set(currentPageID, "display", "none");
            console.log("destroying", currentPageID, currentPage);
            currentPage.destroyRecursive();
            domConstruct.destroy(currentPage);
        }
        
        // domStyle.set(id, "display", "block");
        
        currentPage = createPage(id, true);
        
        currentPageID = id;
        hash(currentPageID);
        
        previousPageButton.setDisabled(!page.previousPageID);
        nextPageButton.setDisabled(!page.nextPageID);
        
        // domStyle.set("startup", "display", "none");
        domStyle.set("pageDiv", "display", "block");
        
        window.scrollTo(0, 0); 
        
        questionEditor.updateQuestionsForPageChange();
    }
    
    function createPage(id, visible) {
        console.log("createPage", id);
        var page = domain.pageDefinitions[id];
        
        if (!page) {
            console.log("ERROR: No definition for page: ", id);
            return;
        }
        
        var pagePane = new ContentPane({
            "id": id,
            title: page.title,
            content: page.description.replace(/\n/g, "<br>\n"),
            // Shorten width so grid scroll bar shows up not clipped
            // Also, looks like nested ContentPanes tend to walk off the right side of the page for some reason
            style: "width: 94%",
            display: "none"
       });
        
       // console.log("about to place pane", id);
       // Dojo seems to require these pages be in the visual hierarchy before some components like grid that are added to them are have startUp called.
       // Otherwise the grid header is not sized correctly and will be overvritten by data
       // This is as opposed to what one might think would reduce resizing and redrawing by adding the page only after components are added
       pagePane.placeAt("pageDiv");
        
       // console.log("Made content pane", id);
       
       array.forEach(page.questions, function(question) {
           questionEditor.insertQuestionIntoDiv(question, pagePane);
       });
       
       // TODO: Fix this to store data
       // TODO: Translate
       if (!page.isHeader) {
           var pageStatusQuestion = {
               "id": id + "_pageStatus",
               "text": "The dashboard status of this page is: ",
               "type": "select",
               "options": "intentionally skipped\npartially done\ncompletely finished",
               "value": at(domain.data, id + "_pageStatus")
           };
           // TODO: Put blank line in here
           questionEditor.insertQuestionIntoDiv(pageStatusQuestion, pagePane);
       } else {
           // console.log("page dashboard", page.id, page.type, page);
           // Put in dashboard
           var pages = domain.pagesToGoWithHeaders[id];
           for (var pageIndex in pages) {
               var pageID = pages[pageIndex];
               if (!domain.pageDefinitions[pageID].type) {
                   var pageStatusQuestion2 = {
                       "id": pageID + "_pageStatus_dashboard",
                       "text": domain.pageDefinitions[pageID].name,
                       "type": "select",
                       "options": "intentionally skipped\npartially done\ncompletely finished",
                       "value": at(domain.data, pageID + "_pageStatus")
                   };               
                   questionEditor.insertQuestionIntoDiv(pageStatusQuestion2, pagePane);
               }
           }
       }
       
       /*
       var nextPageButtonQuestion = {
           "id": id + "_nextPageButton",
           "text": "Mark page complete and proceed to next page",
           "type": "button"
       };
       
       questionEditor.insertQuestionIntoDiv(nextPageButtonQuestion, pagePane);
       */
       
       domain.pageInstantiations[id] = pagePane;
       
       // console.log("about to set visibility", id);
       if (visible) {
            domStyle.set(id, "display", "block");
       } else {
            domStyle.set(id, "display", "none");
       }
       
       pagePane.startup();
       
       return pagePane;
    }
    
    function previousPageClicked(event) {
        // console.log("previousPageClicked", event);
        if (!currentPageID) {
            // Should never get here
            alert("Something wrong with currentPageID");
            return;
        }
        var page = domain.pageDefinitions[currentPageID];
        var previousPageID = page.previousPageID;
        if (previousPageID) {
            changePage(previousPageID);
        } else {
            // Should never get here based on button enabling
            alert("At first page");
        }
    }
    
    function nextPageClicked(event) {
        // console.log("nextPageClicked", event);
        if (!currentPageID) {
            // Should never get here
            alert("Something wrong with currentPageID");
            return;
        }
        var page = domain.pageDefinitions[currentPageID];
        var nextPageID = page.nextPageID;
        if (nextPageID) {
            changePage(nextPageID);
        } else {
            // Should never get here based on button enabling
            alert("At last page");
        }
    }

    function wwsButtonClicked() {
        console.log("wwsButtonClicked");
        location.href = "http://www.workingwithstories.org/";
    }
    
    function homeButtonClicked() {
        console.log("homeButtonClicked");
        urlHashFragmentChanged(startPage);
    }
    
    // TODO: somehow unify this with code in widget-questions-table?
    function newSpecialSelect(id, options, addToDiv) {
        var select = new Select({
            id: id,
            options: options
        });
        select.placeAt(document.getElementById(addToDiv));
        select.startup();
        return select;
    }
    
    // Make all of the application pages selectable from the dropdown list and back/next buttons and put them in a TabContainer
    function createLayout() {
        console.log("createLayout start");
        var pageSelectOptions = [];
        
        var questionIndex = 0;
        var lastPageID = null;
        
        // var imageButton = widgets.newButton("wwsImageButton", "Working With Stories image button", "navigationDiv", wwsButtonClicked);
        // imageButton.set("showLabel", false);
        // imageButton.set("iconClass", "wwsButtonImage");
        
        var homeButton = widgets.newButton("homeImageButton", "Home image button", "navigationDiv", homeButtonClicked);
        homeButton.set("showLabel", false);
        // homeButton.set("iconClass", "dijitEditorIcon dijitEditorIconOutdent");
        homeButton.set("iconClass", "homeButtonImage");
        
        array.forEach(pages, function(page) {
            // console.log("defining page", page.name)
            var title = page.name;
            // TODO: Eventually remove legacy support for old way of defining pages
            // TODO: Eventually don't include popups or other special page types in list to display to user
            var sections = title.split("-");
            if (sections.length >= 2) {
                title = sections[0];
                page.description = " " + sections + "<br>\n" + page.description;
            }
            if (page.isHeader) {
                title = "<i>" + title + "</i>";
            } else {
                title = "&nbsp;&nbsp;&nbsp;&nbsp;" + title;
            }
            if (page.type) {
                title += " SPECIAL: " + page.type;
            }
            
            page.title = title;
            
            // Cleanup options
            // TODO: Ensure options get translated
            array.forEach(page.questions, function(question) {
                domain.questions[question.id] = question;
                
                if ((question.type === "select" || question.type === "checkBoxes") && question.options.indexOf(";") != -1) {
                    // console.log("replacing select options", question.options);
                    question.options = question.options.replace(/;/g, "\n");
                    // console.log("result of replacement", question.options);
                }
                // Hook up question to domain for top level pages
                if (!page.type) {
                    // TODO: Other types of grid
                    if (question.type !== "grid") {
                        question.value = at(domain.data, question.id);
                    } else {
                        // question.value = at(domain.data, question.id);
                        question.value = domain.data[question.id];
                    }
                    console.log("question.value set to", question.id, question.value);
                }
            });
            
            domain.pageDefinitions[page.id] = page;      
            
            // console.log("about to make page");
            // Skip over special page types
            if (!page.type) {
                // Make it easy to lookup previous and next pages from a page
                if (lastPageID) domain.pageDefinitions[lastPageID].nextPageID = page.id;
                page.previousPageID = lastPageID;
                lastPageID = page.id;
                
                // Looks like Dojo select has a limitation where it can only take strings as values
                // so can't pass page in as value here and need indirect pageDefinitions lookup dictionary
                pageSelectOptions.push({label: title, value: page.id});
            }
        });
        
        /*
        // Now, premake pages only after all definitons are done (since some pages refer to others for question popups that may be defined later)
        array.forEach(pages, function(page) {
            // console.log("creating page", page.name)
            // Skip over special page types
            if (!page.type) {
                // Pre-make base pages
                createPage(page.id);
            }
        });  
        */      
        
        /* TODO: Delete these pages after making sure any needed functionality is moved elsewhere (into widgets or more general code) 
        page_designQuestions(tabContainer);
        page_exportSurvey(tabContainer);
        page_takeSurvey(tabContainer);
        page_graphResults(tabContainer);
        */

        selectWidget = newSpecialSelect("mainSelect", pageSelectOptions, "navigationDiv");
        
        // console.log("widget", selectWidget);
        // TODO: Width should be determined from contents of select options using font metrics etc.
        domStyle.set(selectWidget.domNode, "width", "400px");
        selectWidget.on("change", mainSelectChanged);
        
        // TODO: Translation of buttons
        previousPageButton = widgets.newButton("previousPage", "Previous Page", "navigationDiv", previousPageClicked);
        previousPageButton.set("iconClass", "leftButtonImage");
        
        nextPageButton = widgets.newButton("nextPage", "Next Page", "navigationDiv", nextPageClicked);
        nextPageButton.set("iconClass", "rightButtonImage");
        
        // Setup the first page
        var fragment = hash();
        console.log("startup fragment", fragment);
        if (fragment && fragment !== startPage) {
            urlHashFragmentChanged(fragment);
        } else {
            urlHashFragmentChanged(startPage);
            showPage(pages[0].id);
            currentPageID = startPage;
        }
        
        // Log all the unspported types together at end
        console.log("unsupportedTypes: ", questionEditor.unsupportedTypes);
        var unsupported = "";
        for (var key in questionEditor.unsupportedTypes) {
            console.log("unsupportedType", key);
            if (unsupported) unsupported += " ";
            unsupported += key;
        }
        console.log("all unsupported types:", unsupported);
        
        console.log("all buttons", questionEditor.allButtons);
        
        console.log("createLayout end");
        
        // Update if the URL hash fragment changes
        connect.subscribe("/dojo/hashchange", urlHashFragmentChanged);
    }
    
    // Setup important callback for page changes
    domain.setPageChangeCallback(questionEditor.updateQuestionsForPageChange);
    
    // Call the main function
    createLayout();
    
    // turn off startup "please wait" display
    document.getElementById("startup").style.display = "none";
});