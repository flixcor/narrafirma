// Generated from design
"use strict";

define(function() {

var pagesToGoWithHeaders = {
    "page_dashboard": [],
    "page_planning": [
        "page_projectFacts",
        "page_planningQuestionsDraft",
        "page_participantGroups",
        "page_addParticipantGroup",
        "page_aboutYou",
        "page_projectStories",
        "page_projectStory",
        "page_createProjectStoryElements",
        "page_enterProjectStoryElements",
        "page_addStoryElement",
        "page_assessStorySharing",
        "page_revisePNIPlanningQuestions",
        "page_writeProjectSynopsis",
        "page_readPlanningReport"
    ],
    "page_collectionDesign": [
        "page_chooseCollectionVenues",
        "page_addVenue",
        "page_writeStoryElicitingQuestions",
        "page_addElicitingQuestion",
        "page_writeQuestionsAboutStories",
        "page_addStoryQuestion",
        "page_writeQuestionsAboutParticipants",
        "page_addParticipantQuestion",
        "page_designQuestionForm",
        "page_planStoryCollectionSessions",
        "page_addStoryCollectionSession",
        "page_addCollectionSessionActivity",
        "page_readCollectionDesignReport"
    ],
    "page_collectionProcess": [
        "page_finalizeQuestionForms",
        "page_startStoryCollection",
        "page_enterStories",
        "page_reviewIncomingStories",
        "page_stopStoryCollection",
        "page_enterCollectionSessionRecords",
        "page_addCollectionSessionRecord",
        "page_newCollectionSessionConstruction",
        "page_readCollectionProcessReport"
    ],
    "page_catalysis": [
        "page_browseStories",
        "page_themeStories",
        "page_browseGraphs",
        "page_reviewTrends",
        "page_addToObservation",
        "page_createOrEditObservation",
        "page_selectExcerpt",
        "page_addToExcerpt",
        "page_createNewExcerpt",
        "page_reviewExcerpts",
        "page_interpretObservations",
        "page_clusterInterpretations",
        "page_describePerspectives",
        "page_addPerspective",
        "page_annotateResultForPerspective",
        "page_annotateExcerptForPerspective",
        "page_annotateInterpretationForPerspective",
        "page_readCatalysisReport"
    ],
    "page_sensemaking": [
        "page_planSensemakingSessions",
        "page_addSensemakingSessionPlan",
        "page_addSensemakingSessionActivity",
        "page_enterSensemakingSessionRecords",
        "page_addSensemakingSessionRecord",
        "page_addResonantStory",
        "page_newSensemakingSessionOutcome",
        "page_newSensemakingSessionConstruction",
        "page_readSensemakingReport"
    ],
    "page_intervention": [
        "page_projectOutcomesForIntervention",
        "page_projectOutcome",
        "page_designInterventions",
        "page_addIntervention",
        "page_recordInterventions",
        "page_addInterventionRecord",
        "page_interventionReport"
    ],
    "page_return": [
        "page_gatherFeedback",
        "page_enterFeedbackPiece",
        "page_reflectOnProject",
        "page_prepareProjectPresentation",
        "page_addPresentationElement",
        "page_projectRequests",
        "page_addNewReturnRequest",
        "page_returnReport"
    ],
    "page_projectReport": []
};

// All the data collected by the project
var data = {
    "project_generalNotes_planning": "",
    "project_title": "",
    "project_communityOrOrganizationName": "",
    "project_topic": "",
    "project_startAndEndDates": "",
    "project_funders": "",
    "project_facilitators": "",
    "project_reportStartText": "",
    "project_reportEndText": "",
    "project_pniQuestions_goal_draft": "",
    "project_pniQuestions_relationships_draft": "",
    "project_pniQuestions_focus_draft": "",
    "project_pniQuestions_range_draft": "",
    "project_pniQuestions_scope_draft": "",
    "project_pniQuestions_emphasis_draft": "",
    "project_participantGroupsList": [],
    "aboutYou_experience": null,
    "aboutYou_help": null,
    "aboutYou_tech": null,
    "project_projectStoriesList": [],
    "project_projectStoryElementsList": [],
    "assessment_counterStories": null,
    "assessment_authority": null,
    "assessment_mistakes": null,
    "assessment_silencing": null,
    "assessment_conflict": null,
    "assessment_remindings": null,
    "assessment_retellings": null,
    "assessment_folklore": null,
    "assessment_storyTypes": null,
    "assessment_sensemaking": null,
    "assessment_realStories": null,
    "assessment_negotiations": null,
    "assessment_cotelling": null,
    "assessment_blunders": null,
    "assessment_accounting": null,
    "assessment_commonStories": null,
    "assessment_sacredStories": null,
    "assessment_condensedStories": null,
    "assessment_intermingling": null,
    "assessment_culture": null,
    "assessment_result_freedomSubscore": null,
    "assessment_result_flowSubscore": null,
    "assessment_result_knowledgeSubscore": null,
    "assessment_result_unitySubscore": null,
    "assessment_result_grandTotal": null,
    "assessment_notes": "",
    "project_pniQuestions_goal_final": "",
    "project_pniQuestions_relationships_final": "",
    "project_pniQuestions_focus_final": "",
    "project_pniQuestions_range_final": "",
    "project_pniQuestions_scope_final": "",
    "project_pniQuestions_emphasis_final": "",
    "project_synopsis": "",
    "project_planningReport": null,
    "project_generalNotes_collectionDesign": "",
    "project_venuesList": [],
    "project_elicitingQuestionsList": [],
    "project_storyQuestionsList": [],
    "project_participantQuestionsList": [],
    "questionForm_title": "",
    "questionForm_image": "",
    "questionForm_startText": "",
    "questionForm_endText": "",
    "project_collectionSessionPlansList": [],
    "project_collectionDesignReport": null,
    "project_generalNotes_collectionProcess": "",
    "project_collectionSessionRecordsList": [],
    "project_collectionProcessReport": null,
    "project_generalNotes_catalysis": "",
    "themeStories": null,
    "graphBrowserDisplay": null,
    "reviewTrends_minSubsetSize": null,
    "reviewTrends_significanceThreshold": null,
    "project_savedExcerptsList": [],
    "project_observationsDisplayList": [],
    "clusterInterpretations_clusterSpace": null,
    "project_perspectivesList": [],
    "catalysisReport": null,
    "project_generalNotes_sensemaking": "",
    "project_sensemakingSessionPlansList": [],
    "project_sensemakingSessionRecordsList": [],
    "sensemakingReport": null,
    "project_generalNotes_intervention": "",
    "project_outcomesList": [],
    "project_interventionPlansList": [],
    "project_interventionRecordsList": [],
    "interventionReport": null,
    "project_generalNotes_return": "",
    "project_feedbackItemsList": [],
    "feedback_generalNotes": "",
    "project_reflect_stories": "",
    "project_reflect_facilitation": "",
    "project_reflect_planning": "",
    "project_reflect_ownPNI": "",
    "project_reflect_community": "",
    "project_reflect_personalStrengths": "",
    "project_reflect_teamStrengths": "",
    "project_reflect_newIdeas": "",
    "project_reflect_notes": "",
    "project_presentationElementsList": [],
    "project_returnRequestsList": [],
    "returnReport": null,
    "projectReport": null
};

var other = [
    {
        "__id": "page_addParticipantGroup",
        "__type": "popup",
        "participantGroup_name": "",
        "participantGroup_description": "",
        "participantGroup_status": null,
        "participantGroup_confidence": null,
        "participantGroup_time": null,
        "participantGroup_education": null,
        "participantGroup_physicalDisabilities": null,
        "participantGroup_emotionalImpairments": null,
        "participantGroup_performing": null,
        "participantGroup_conforming": null,
        "participantGroup_promoting": null,
        "participantGroup_venting": null,
        "participantGroup_interest": null,
        "participantGroup_feelings_project": null,
        "participantGroup_feelings_facilitator": null,
        "participantGroup_feelings_stories": null,
        "participantGroup_topic_feeling": null,
        "participantGroup_topic_private": null,
        "participantGroup_topic_articulate": null,
        "participantGroup_topic_timeframe": null
    },
    {
        "__id": "page_projectStory",
        "__type": "popup",
        "projectStory_scenario": null,
        "projectStory_outcome": null,
        "projectStory_text": "",
        "projectStory_name": "",
        "projectStory_feelAbout": "",
        "projectStory_surprise": "",
        "projectStory_dangers": ""
    },
    {
        "__id": "page_addStoryElement",
        "__type": "popup",
        "storyElement_name": "",
        "storyElement_type": null,
        "storyElement_description": ""
    },
    {
        "__id": "page_addVenue",
        "__type": "popup",
        "venue_name": "",
        "venue_primary_type": null,
        "venue_participantGroups": "",
        "venue_timeline": "",
        "venue_locations": "",
        "venue_help": "",
        "venue_resources": "",
        "venue_description": ""
    },
    {
        "__id": "page_addElicitingQuestion",
        "__type": "popup",
        "elicitingQuestion_text": "",
        "elicitingQuestion_type": null
    },
    {
        "__id": "page_addStoryQuestion",
        "__type": "popup",
        "storyQuestion_text": "",
        "storyQuestion_type": null,
        "storyQuestion_shortName": "",
        "storyQuestion_options": "",
        "storyQuestion_help": ""
    },
    {
        "__id": "page_addParticipantQuestion",
        "__type": "popup",
        "participantQuestion_text": "",
        "participantQuestion_type": null,
        "participantQuestion_shortName": "",
        "participantQuestion_options": "",
        "participantQuestion_help": ""
    },
    {
        "__id": "page_addStoryCollectionSession",
        "__type": "popup",
        "collectionSessionPlan_name": "",
        "collectionSessionPlan_groups": "",
        "collectionSessionPlan_repetitions": "",
        "collectionSessionPlan_duration": "",
        "collectionSessionPlan_times": "",
        "collectionSessionPlan_location": "",
        "collectionSessionPlan_numPeople": "",
        "collectionSessionPlan_materials": "",
        "collectionSessionPlan_details": "",
        "collectionSessionPlan_activitiesList": []
    },
    {
        "__id": "page_addCollectionSessionActivity",
        "__type": "popup",
        "collectionSessionActivity_name": "",
        "collectionSessionActivity_type": null,
        "collectionSessionActivity_plan": "",
        "collectionSessionActivity_optionalParts": "",
        "collectionSessionActivity_duration": "",
        "collectionSessionActivity_recording": "",
        "collectionSessionActivity_materials": "",
        "collectionSessionActivity_spaces": "",
        "collectionSessionActivity_facilitation": ""
    },
    {
        "__id": "page_addCollectionSessionRecord",
        "__type": "popup",
        "collectionSessionRecord_name": "",
        "collectionSessionRecord_whenWhere": "",
        "collectionSessionRecord_groups": "",
        "collectionSessionRecord_participants": "",
        "collectionSessionRecord_plan": "",
        "collectionSessionRecord_notes": "",
        "collectionSessionRecord_constructionsList": [],
        "collectionSessionRecord_reflections_change_participantPerceptions": "",
        "collectionSessionRecord_reflections_change_yourPerceptions": "",
        "collectionSessionRecord_reflections_change_project": "",
        "collectionSessionRecord_reflections_interaction_participants": "",
        "collectionSessionRecord_reflections_interaction_participantsAndFacilitator": "",
        "collectionSessionRecord_reflections_interaction_stories": "",
        "collectionSessionRecord_reflections_learning_special": "",
        "collectionSessionRecord_reflections_learning_surprise": "",
        "collectionSessionRecord_reflections_learning_workedWell": "",
        "collectionSessionRecord_reflections_learning_newIdeas": "",
        "collectionSessionRecord_reflections_learning_wantToRemember": ""
    },
    {
        "__id": "page_newCollectionSessionConstruction",
        "__type": "popup",
        "collectionSessionRecord_construction_name": "",
        "collectionSessionRecord_construction_type": null,
        "collectionSessionRecord_construction_description": ""
    },
    {
        "__id": "page_addToObservation",
        "__type": "popup"
    },
    {
        "__id": "page_createOrEditObservation",
        "__type": "popup",
        "observation_name": "",
        "observation_text": "",
        "observation__observationResultsList": null,
        "observation_firstInterpretation_text": "",
        "observation_firstInterpretation_name": "",
        "observation_firstInterpretation_idea": "",
        "observation_firstInterpretation_excerptsList": [],
        "observation_competingInterpretation_text": "",
        "observation_competingInterpretation_name": "",
        "observation_competingInterpretation_idea": "",
        "observation_competingInterpretation_excerptsList": [],
        "observation_thirdInterpretation_text": "",
        "observation_thirdInterpretation_name": "",
        "observation_thirdInterpretation_idea": "",
        "observation_thirdInterpretation_excerptsList": []
    },
    {
        "__id": "page_selectExcerpt",
        "__type": "popup",
        "selectExcerpt_excerptsListDisplay": null
    },
    {
        "__id": "page_addToExcerpt",
        "__type": "popup",
        "addToExcerpt_excerptsListChoose": null
    },
    {
        "__id": "page_createNewExcerpt",
        "__type": "popup",
        "excerpt_name": "",
        "excerpt_text": "",
        "excerpt_notes": ""
    },
    {
        "__id": "page_addPerspective",
        "__type": "popup",
        "perspective_name": "",
        "perspective_description": "",
        "perspective_linkedResultsList": null,
        "perspective_linkedExcerptsList": null,
        "perspective_linkedInterpretationsList": null
    },
    {
        "__id": "page_annotateResultForPerspective",
        "__type": "popup",
        "perspective_resultLinkageNotes": ""
    },
    {
        "__id": "page_annotateExcerptForPerspective",
        "__type": "popup",
        "perspective_excerptLinkageNotes": ""
    },
    {
        "__id": "page_annotateInterpretationForPerspective",
        "__type": "popup",
        "perspective_interpretationLinkageNotes": ""
    },
    {
        "__id": "page_addSensemakingSessionPlan",
        "__type": "popup",
        "sensemakingSessionPlan_name": "",
        "sensemakingSessionPlan_groups": "",
        "sensemakingSessionPlan_repetitions": "",
        "sensemakingSessionPlan_duration": "",
        "sensemakingSessionPlan_times": "",
        "sensemakingSessionPlan_location": "",
        "sensemakingSessionPlan_numPeople": "",
        "sensemakingSessionPlan_materials": "",
        "sensemakingSessionPlan_details": "",
        "sensemakingSessionPlan_activitiesList": []
    },
    {
        "__id": "page_addSensemakingSessionActivity",
        "__type": "popup",
        "sensemakingSessionPlan_activity_name": "",
        "sensemakingSessionPlan_activity_type": null,
        "sensemakingSessionPlan_activity_plan": "",
        "sensemakingSessionPlan_activity_optionalParts": "",
        "sensemakingSessionPlan_activity_duration": "",
        "sensemakingSessionPlan_activity_recording": "",
        "sensemakingSessionPlan_activity_materials": "",
        "sensemakingSessionPlan_activity_spaces": "",
        "sensemakingSessionPlan_activity_facilitation": ""
    },
    {
        "__id": "page_addSensemakingSessionRecord",
        "__type": "popup",
        "sensemakingSessionRecord_name": "",
        "sensemakingSessionRecord_whenWhere": "",
        "sensemakingSessionRecord_groups": "",
        "sensemakingSessionRecord_participants": "",
        "sensemakingSessionRecord_plan": "",
        "sensemakingSessionRecord_notes": "",
        "sensemakingSessionRecord_resonantStoriesList": [],
        "sensemakingSessionRecord_outcomesList": [],
        "sensemakingSessionRecord_constructionsList": [],
        "sensemakingSessionRecord_reflections_change_participantPerceptions": "",
        "sensemakingSessionRecord_reflections_change_yourPerceptions": "",
        "sensemakingSessionRecord_reflections_change_project": "",
        "sensemakingSessionRecord_reflections_interaction_participants": "",
        "sensemakingSessionRecord_reflections_interaction_participantsAndFacilitator": "",
        "sensemakingSessionRecord_reflections_interaction_stories": "",
        "sensemakingSessionRecord_reflections_learning_special": "",
        "sensemakingSessionRecord_reflections_learning_surprise": "",
        "sensemakingSessionRecord_reflections_learning_workedWell": "",
        "sensemakingSessionRecord_reflections_learning_newIdeas": "",
        "sensemakingSessionRecord_reflections_learning_wantToRemember": ""
    },
    {
        "__id": "page_addResonantStory",
        "__type": "popup",
        "sensemakingSessionRecord_resonantStory_type": null,
        "sensemakingSessionRecord_resonantStory_reason": "",
        "sensemakingSessionRecord_resonantStory_groups": "",
        "sensemakingSessionRecord_resonantStory_notes": ""
    },
    {
        "__id": "page_newSensemakingSessionOutcome",
        "__type": "popup",
        "sensemakingSessionRecord_outcome_type": null,
        "sensemakingSessionRecord_outcome_name": "",
        "sensemakingSessionRecord_outcome_description": ""
    },
    {
        "__id": "page_newSensemakingSessionConstruction",
        "__type": "popup",
        "sensemakingSessionRecord_construction_name": "",
        "sensemakingSessionRecord_construction_type": null,
        "sensemakingSessionRecord_construction_description": ""
    },
    {
        "__id": "page_projectOutcome",
        "__type": "popup",
        "outcomes_group": "",
        "outcomes_peopleFeltHeard": null,
        "outcomes_peopleFeltInvolved": null,
        "outcomes_peopleLearnedAboutCommOrg": null,
        "outcomes_peopleWantedToTellMoreStories": null,
        "outcomes_peopleWantedToShareMoreStoriesWithEachOther": null,
        "outcomes_peopleFeltStoriesNeededToBeHeard": null,
        "outcomes_peopleFeltNobodyCares": null,
        "outcomes_peopleFeltNobodyCanMeetNeeds": null,
        "outcomes_peopleFeltTheyNeedNewStories": null,
        "outcomes_peopleWantedToKeepExploring": null,
        "outcomes_crisisPointsWereFound": null,
        "outcomes_issuesWereBeyondWords": null,
        "outcomes_peopleLarnedAboutTopic": null,
        "outcomes_issuesNewMembersStruggleWith": null,
        "outcomes_foundInfoWithoutUnderstanding": null,
        "outcomes_foundOverConfidence": null,
        "outcomes_peopleCuriousAboutStoryWork": null
    },
    {
        "__id": "page_addIntervention",
        "__type": "popup",
        "interventionPlan_name": "",
        "interventionPlan_type": null,
        "interventionPlan_description": "",
        "interventionPlan_groups": "",
        "interventionPlan_times": "",
        "interventionPlan_locations": "",
        "interventionPlan_help": "",
        "interventionPlan_permission": "",
        "interventionPlan_participation": "",
        "interventionPlan_materials": "",
        "interventionPlan_space": "",
        "interventionPlan_techResources": "",
        "interventionPlan_recording": ""
    },
    {
        "__id": "page_addInterventionRecord",
        "__type": "popup",
        "interventionRecord_name": "",
        "interventionRecord_description": "",
        "interventionRecord_groups": "",
        "interventionRecord_reflections_change_participantPerceptions": "",
        "interventionRecord_reflections_change_yourPerceptions": "",
        "interventionRecord_reflections_change_project": "",
        "interventionRecord_reflections_interaction_participants": "",
        "interventionRecord_reflections_interaction_participantsAndFacilitator": "",
        "interventionRecord_reflections_interaction_stories": "",
        "interventionRecord_reflections_learning_special": "",
        "interventionRecord_reflections_learning_surprise": "",
        "interventionRecord_reflections_learning_workedWell": "",
        "interventionRecord_reflections_learning_newIdeas": "",
        "interventionRecord_reflections_learning_wantToRemember": ""
    },
    {
        "__id": "page_enterFeedbackPiece",
        "__type": "popup",
        "feedback_text": "",
        "feedback_name": "",
        "feedback_type": null,
        "feedback_who": "",
        "feedback_prompt": "",
        "feedback_response": "",
        "feedback_notes": ""
    },
    {
        "__id": "page_addPresentationElement",
        "__type": "popup",
        "projectPresentationElement_name": "",
        "projectPresentationElement_statement": "",
        "projectPresentationElement_evidence": "",
        "projectPresentationElement_QA": "",
        "projectPresentationElement_notes": ""
    },
    {
        "__id": "page_addNewReturnRequest",
        "__type": "popup",
        "returnRequest_text": "",
        "returnRequest_type": null,
        "returnRequest_isMet": null,
        "returnRequest_whatHappened": "",
        "returnRequest_notes": ""
    }
];

return {
    "pagesToGoWithHeaders": pagesToGoWithHeaders,
    "data": data,
    "other": other
};
});
