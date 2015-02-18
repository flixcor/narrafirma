// Generated from design
define([], function() {
    "use strict";
    
    var questions = [
        {"id":"project_sensemakingSessionRecordsLabel", "type":"label", "isInReport":false, "isGridColumn":false},
        {"id":"project_sensemakingSessionRecordsList", "type":"grid", "isInReport":true, "isGridColumn":true, "options":["page_addSensemakingSessionRecord"]}
    ];
    
    function buildPage(builder, contentPane, model) {
        builder.addQuestions(questions, contentPane, model);
    }

    return {
        "id": "page_enterSensemakingSessionRecords",
        "type": "page",
        "isHeader": false,
        "questions": questions,
        "buildPage": buildPage
    };
});