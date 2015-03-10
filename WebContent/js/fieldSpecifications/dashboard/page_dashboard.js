define([], function() {
    "use strict";
    return [
        {
            id: "page_dashboard",
            displayName: "Dashboard",
            displayType: "page",
            isHeader: true,
            section: "dashboard",
            modelClass: "ProjectModel"
        },
        {
            id: 'project_mainDashboardLabel',
            dataType: 'none',
            displayType: 'label',
            displayPrompt: 'NarraFirma Dashboard (Click on the "Home" icon to return here. Click on buttons below to open the related section.)',
         },
         {
             id: 'project_mainDashboard_launchIntroduction',
             dataType: 'none',
             displayType: 'button',
             displayConfiguration: {action: 'guiOpenSection', section: 'page_introduction'},
             displayPrompt: 'Go to introduction page'
         },
         {
             id: 'project_launchSection_planning',
             dataType: 'none',
             displayType: 'dashboardSectionStatusDisplay',
             displayConfiguration: {action: 'guiOpenSection', section: 'page_planning'},
             displayPrompt: 'Planning'
         },
         {
             id: 'project_launchSection_collectionDesign',
             dataType: 'none',
             displayType: 'dashboardSectionStatusDisplay',
             displayConfiguration: {action: 'guiOpenSection', section: 'page_collectionDesign'},
             displayPrompt: 'Collection design'
         },
         {
             id: 'project_launchSection_collectionProcess',
             dataType: 'none',
             displayType: 'dashboardSectionStatusDisplay',
             displayConfiguration: {action: 'guiOpenSection', section: 'page_collectionProcess'},
             displayPrompt: 'Collection process'
         },
         {
             id: 'project_launchSection_catalysis',
             dataType: 'none',
             displayType: 'dashboardSectionStatusDisplay',
             displayConfiguration: {action: 'guiOpenSection', section: 'page_catalysis'},
             displayPrompt: 'Catalysis'
         },
         {
             id: 'project_launchSection_sensemaking',
             dataType: 'none',
             displayType: 'dashboardSectionStatusDisplay',
             displayConfiguration: {action: 'guiOpenSection', section: 'page_sensemaking'},
             displayPrompt: 'Sensemaking'
         },
         {
             id: 'project_launchSection_intervention',
             dataType: 'none',
             displayType: 'dashboardSectionStatusDisplay',
             displayConfiguration: {action: 'guiOpenSection', section: 'page_intervention'},
             displayPrompt: 'Intervention'
         },
         {
             id: 'project_launchSection_return',
             dataType: 'none',
             displayType: 'dashboardSectionStatusDisplay',
             displayConfiguration: {action: 'guiOpenSection', section: 'page_return'},
             displayPrompt: 'Return'
         },
         {
             id: 'project_launchSection_projectReport',
             dataType: 'none',
             displayType: 'dashboardSectionStatusDisplay',
             displayConfiguration: {action: 'guiOpenSection', section: 'page_projectReport'},
             displayPrompt: 'Project report'
         },
    ];
});
