(function() {
    "use strict";
    
    // Surprising issue: If you reload this page after making changes, the changes will reappear in Firefox because the textarea's content is carried forward.

    console.log("narrafirmaWordpressAdmin called");
    
    // The div containing the form to edit JSON directly
    var jsonForm;
    
    // The textarea in the form
    var journalsTextarea;
    
    /* global m */
    
    var NarraFirmaAdminComponent = {
        controller: function(data) {
            return {
                greeting: "Hello from NarraFirmaAdminComponent",
                showJSON: false,
                // Read JSON twice to ensure changing the second copy won't affect the first
                originalJournalDefinitions: readJournalDefinitionsFromTextarea(),
                journalDefinitions: readJournalDefinitionsFromTextarea()
            };
        },
        view: function(controller) {
            var isJSONUnchanged = true;
            try {
                isJSONUnchanged = JSON.stringify(controller.originalJournalDefinitions) === JSON.stringify(controller.journalDefinitions);
            } catch (e) {
                console.log("Problem comparing JSON for old and new journal definitions", e);
            }
                
            return m("div", [
                m("h1", controller.greeting),
                Object.keys(controller.journalDefinitions).map(function(key) {
                    var journal = controller.journalDefinitions[key];
                    return m("div", [
                        key,
                        m("button", {onclick: deleteJournal.bind(null, controller, key)}, "delete"),
                        m("br"),
                        m("div", "  write: " + journal.write),
                        m("div", "  read: " + journal.read),
                        m("div", "  survey: " + journal.survey),
                        m("div", "  anonymous survey: " + (journal.survey.indexOf(true) !== -1)),
                    ]);
                }),
                m("button", {onclick: newProject.bind(null, controller)}, "New project"),
                m("br"),
                m("button", {onclick: cancelChanges.bind(null, controller), disabled: isJSONUnchanged}, "Cancel changes"),
                m("hr"),
                m("span", {"for": "narrafirma-displayJSON"}, "Edit JSON directly"),
                m("input[type=checkbox]", {id: "narrafirma-displayJSON", onclick: m.withAttr("checked", showJSONChecked.bind(null, controller)), checked: controller.showJSON})
            ]);
        }
    };
    
    function deleteJournal(controller, key) {
        if (!confirm("Are you sure you want to delete: " + key + "?")) return;
        delete controller.journalDefinitions[key];
        writeJournalDefinitionsToTextarea(controller.journalDefinitions);
    }
    
    function newProject(controller) {
        var newName = prompt("New project name?");
        if (!newName) return;
        var key = "NarraFirmaProject-" + newName;
        if (controller.journalDefinitions[key]) {
            alert("A project with that name already exists");
            return;
        }
        controller.journalDefinitions[key] = {
            write: [],
            read: [],
            survey: []
        };
        writeJournalDefinitionsToTextarea(controller.journalDefinitions);
    }
    
    function cancelChanges(controller) {
        if (!confirm("Are you sure you want to discard recent changes?")) return;
        writeJournalDefinitionsToTextarea(controller.originalJournalDefinitions);
        controller.journalDefinitions = readJournalDefinitionsFromTextarea();
    }
    
    function showJSONChecked(controller, checked) {
        controller.showJSON = checked;
        var display = "none";
        if (controller.showJSON) {
            display = "block";
        }
        jsonForm.style.display = display;
    }
    
    function writeJournalDefinitionsToTextarea(journalDefinitions) {
        journalsTextarea.value = JSON.stringify(journalDefinitions, null, 4);
    }
    
    function readJournalDefinitionsFromTextarea() {
        var text = journalsTextarea.value;
        console.log("readJournalDefinitionsFromTextarea", text);
        try {
            return JSON.parse(text);
        } catch (e) {
            console.log("Problem parsin JSON", e);
            return {};
        }
    }
    
    function startup() {
        jsonForm = document.getElementById("narrafirma-json-form");
        jsonForm.style.display = 'none';
        
        journalsTextarea = document.getElementsByName("narrafirma_admin_settings[journals]")[0];
        
        m.mount(document.getElementById("narrafirma-project-list-editor"), NarraFirmaAdminComponent);
    }
    
    // From: http://stackoverflow.com/questions/807878/javascript-that-executes-after-page-load
    if (window.attachEvent) {
        window.attachEvent('onload', startup);
    } else {
        if (window.onload) {
            var curronload = window.onload;
            var newonload = function() {
                curronload();
                startup();
            };
            window.onload = newonload;
        } else {
            window.onload = startup;
        }
    }
  
})();