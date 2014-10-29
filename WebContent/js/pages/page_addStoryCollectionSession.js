// Generated from design
"use strict";

define([
    "../widgetBuilder"
], function(
    widgets
) {

    var questions = [
        {"id":"collectionSessionPlan_name", "type":"text", "isInReport":true, "isGridColumn":true},
        {"id":"collectionSessionPlan_repetitions", "type":"text", "isInReport":true, "isGridColumn":true},
        {"id":"collectionSessionPlan_duration", "type":"text", "isInReport":true, "isGridColumn":true},
        {"id":"collectionSessionPlan_times", "type":"text", "isInReport":true, "isGridColumn":true},
        {"id":"collectionSessionPlan_location", "type":"text", "isInReport":true, "isGridColumn":true},
        {"id":"collectionSessionPlan_numPeople", "type":"text", "isInReport":true, "isGridColumn":true},
        {"id":"collectionSessionPlan_groups", "type":"text", "isInReport":true, "isGridColumn":true},
        {"id":"collectionSessionPlan_materials", "type":"textarea", "isInReport":true, "isGridColumn":true},
        {"id":"collectionSessionPlan_details", "type":"textarea", "isInReport":true, "isGridColumn":true},
        {"id":"collectionSessionPlan_activitiesList", "type":"grid", "isInReport":true, "isGridColumn":false, "options":["page_addCollectionSessionActivity"]},
        {"id":"collectionSessionPlan_printCollectionSessionAgendaButton", "type":"button", "isInReport":false, "isGridColumn":false}
    ];

    function addWidgets(contentPane, model) {
        widgets.addQuestionWidgets(questions, contentPane, model);
    }

    return {
        "id": "page_addStoryCollectionSession",
        "name": "Design story collection session",
        "type": "popup",
        "isHeader": false,
        "questions": questions,
        "addWidgets": addWidgets
    };
});