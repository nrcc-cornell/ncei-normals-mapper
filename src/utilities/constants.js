// elements in Element selection menu
const elements = [
    {menuName: 'Maximum Temperature',  name: 'maxt', reduce: 'mean', summary: "Mean", units: String.fromCharCode(8457)},	//set as default
    {menuName: 'Minimum Temperature',  name: 'mint', reduce: 'mean', summary: "Mean", units: String.fromCharCode(8457)},
    {menuName: 'Average Temperature',  name: 'avgt', reduce: 'mean', summary: "Mean", units: String.fromCharCode(8457)},
    {menuName: 'Precipitation',        name: 'pcpn', reduce: 'sum',  summary: "Total",  units: 'inches'},
    {menuName: 'All (for point only)', name: 'all',  reduce: null,   summary: null,   units: null},
];

// element names for titles
const elementNames = () => {
    const names = {date: "Date"};
    elements.forEach((e) => {
        names[e.name] = e.summary + " " + e.menuName + " (" + e.units + ")";
    })
    names["all"] = "All Elements"
    return names;
};

// month items in date selections
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

// seasons items in date selections
const seasons = [
    ['Winter', '12', '02'],
    ['Spring', '03', '05'],
    ['Summer', '06', '08'],
    ['Autumn', '09', '11'],
    ['Annual', '01', '12'],
];

// items in Region selection menu
const regions = [
    {'name': '- Climate Regions -', 'states': -1},
    {'name': 'CONUS', 'states': 'WA-MN-FL-ME'},
    {'name': 'Northeast', 'states': 'ME-PA-MD'},
    {'name': 'Southeast', 'states': 'VA-FL-AL-NC'},
    {'name': 'Upper Midwest', 'states': 'MN-IA-MI'},
    {'name': 'Ohio Valley', 'states': 'IL-MO-TN-WV'},
    {'name': 'South', 'states': 'KS-TX-MS'},
    {'name': 'Northern Rockies & Plains', 'states': 'MT-NE'},
    {'name': 'Northwest', 'states': 'WA-ID'},
    {'name': 'West', 'states': 'CA-NV'},
    {'name': 'Southwest', 'states': 'UT-AZ-CO'},
    {'name': '- Regional Climate Centers -', 'states': -2},
    {'name': 'Northeast', 'states': 'ME-WV'},
    {'name': 'Southeast', 'states': 'VA-FL-AL-NC'},
    {'name': 'Midwestern', 'states': 'MN-IA-MO-OH'},
    {'name': 'Southern', 'states': 'TX-OK-TN'},
    {'name': 'High Plains', 'states': 'ND-WY-KS'},
    {'name': 'Western', 'states': 'CA-MT-NM'},
    {'name': '- NWS Regions -', 'states': -3},
    {'name': 'Eastern', 'states': 'ME-OH-SC'},
    {'name': 'Southern', 'states': 'NM-OK-TX-FL'},
    {'name': 'Central', 'states': 'WY-MN-MI-KY-MO'},
    {'name': 'Western', 'states': 'WA-MT-CA'},
    {'name': '- NCA Regions -', 'states': -4},
    {'name': 'Northeast', 'states': 'ME-WV'},
    {'name': 'Southeast', 'states': 'VA-FL-AR'},
    {'name': 'Midwest', 'states': 'MN-IA-MO-OH'},
    {'name': 'Great Plains', 'states': 'MT-TX'},
    {'name': 'Northwest', 'states': 'WA-ID'},
    {'name': 'Southwest', 'states': 'CA-WY-NM'},
];

// maximum bounds
const maxbbox = {
    west: -124.66667,
    south: 24.541699,
    east: -67.000000,
    north: 49.333366,
};

// initial levels object
const default_levels = {
    server: [], 
    client: [],
};

// initial colors object
const default_colors = {
    server: [], 
    client: [],
};

// default image settings
const default_imageParams = {
    proj: "3857", 
    width: 800, 
    interp: "none",
//  levels: [50,55,60,65,70],
    overlays: [
        "state:1:black", 
        "county:0.5:grey"
    ],
};

// default set of input parameters
const default_params = {
    "grid":"ncei-norm:91-20",
    //"state":"ME,WV",
    "areaDef":{state: "ME,WV"},
    "sdate":"1991-01",
    "edate":"1991-01",
    "elems":[{
      "name":"maxt",
      "interval":[0,1],
      "duration":1,
      "reduce":"mean"
    }],
    "output":"png",
    "image": default_imageParams,
};


// width of options drawer
const drawerWidth = 400;

// text in information popups
const infoText = {
    postal: `A list of state abbreviations will return a map emcompassing all states in the list. 
    For example, "ME,WV" will return the Northeast. For menus under "State options", the list of items will be 
    all those at least partially within the individual states in the list.`,
    bbox: 'Longitudes in the Western Hemisphere are negative. Postive West and East values entered here will be changed to negative.',
    loc: 'Longitudes in the Western Hemisphere are negative. Postive longitude values entered here will be changed to negative.',
    levels: 'Enter comma-separated contour levels from lowest to highest. Leave blank for server defaults. Changes will be used on subsequent maps unitl cleared.',
    colors: 'Color map not defined for this number of levels.',
};

export {elements, elementNames, regions, months, seasons, default_params, default_imageParams, default_levels, default_colors, drawerWidth, infoText, maxbbox};