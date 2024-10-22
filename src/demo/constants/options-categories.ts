const imageSource =
  "https://cdn-web.wefox.com/public/pkg/@wefox/icons/1.7.6/svg/company-logos/getsafe.svg";
// const imageSource = '';

export const preSelectedMassCity = {
  category: {
    label: "Massachusetts",
    value: "MA",
    selected: true,
  },
  items: [
    { image_source: imageSource, label: "Boston", value: "Boston" },
    {
      image_source: imageSource,
      label: "Worcester",
      value: "Worcester",
      selected: true,
    },
    { image_source: imageSource, label: "Springfield", value: "Springfield" },
    { image_source: imageSource, label: "Cambridge", value: "Cambridge" },
    { image_source: imageSource, label: "Lowell", value: "Lowell" },
    { image_source: imageSource, label: "Brockton", value: "Brockton" },
  ],
};

export const preSelectedPennCities = {
  category: {
    label: "Pennsylvania",
    value: "PA",
    selected: true,
  },
  items: [
    { image_source: imageSource, label: "Philadelphia", value: "Philadelphia" },
    { image_source: imageSource, label: "Pittsburg", value: "Pittsburg" },
    {
      image_source: imageSource,
      label: "Allentown",
      value: "Allentown",
      selected: true,
    },
    { image_source: imageSource, label: "Erie", value: "Erie" },
    { image_source: imageSource, label: "Reading City", value: "Reading City" },
    {
      image_source: imageSource,
      label: "Upper Darby",
      value: "Upper Darby",
      selected: true,
    },
  ],
};

export const EASTERN_STATES = [
  {
    category: {
      label: "New York",
      value: "NY",
    },
    items: [
      { image_source: imageSource, label: "Buffalo", value: "buffalo" },
      { image_source: imageSource, label: "Rochester", value: "rochester" },
      { image_source: imageSource, label: "New York City", value: "nyc" },
      { image_source: imageSource, label: "Syracuse", value: "syracuse" },
      {
        image_source: imageSource,
        label: "Hampstead Town",
        value: "hampstead town",
      },
      { image_source: imageSource, label: "Islip", value: "islip" },
    ],
  },
  {
    category: {
      label: "Massachusetts",
      value: "MA",
      selected: false,
    },
    items: [
      { image_source: imageSource, label: "Boston", value: "Boston" },
      {
        image_source: imageSource,
        label: "Worcester",
        value: "Worcester",
        selected: false,
      },
      { image_source: imageSource, label: "Springfield", value: "Springfield" },
      { image_source: imageSource, label: "Cambridge", value: "Cambridge" },
      { image_source: imageSource, label: "Lowell", value: "Lowell" },
      { image_source: imageSource, label: "Brockton", value: "Brockton" },
    ],
  },
  {
    category: {
      label: "Pennsylvania",
      value: "PA",
    },
    items: [
      {
        image_source: imageSource,
        label: "Philadelphia",
        value: "Philadelphia",
      },
      { image_source: imageSource, label: "Pittsburg", value: "Pittsburg" },
      { image_source: imageSource, label: "Allentown", value: "Allentown" },
      { image_source: imageSource, label: "Erie", value: "Erie" },
      { image_source: imageSource, label: "Springfield", value: "Springfield" },

      {
        image_source: imageSource,
        label: "Reading City",
        value: "Reading City",
      },
      { image_source: imageSource, label: "Upper Darby", value: "Upper Darby" },
    ],
  },
];

export const WESTERN_STATES = [
  {
    category: {
      label: "California",
      value: "CA",
    },
    items: [
      { image_source: imageSource, label: "Los Angeles", value: "Los Angeles" },
      { image_source: imageSource, label: "San Diego", value: "San Diego" },
      { image_source: imageSource, label: "San Jose", value: "San Jose" },
      {
        image_source: imageSource,
        label: "San Francisco",
        value: "San Francisco",
      },
      { image_source: imageSource, label: "Fresno", value: "Fresno" },
      { image_source: imageSource, label: "Sacremento", value: "Sacremento" },
    ],
  },
  {
    category: {
      label: "Washington",
      value: "WA",
    },
    items: [
      { image_source: imageSource, label: "Seattle", value: "Seattle" },
      { image_source: imageSource, label: "Spokane", value: "Spokane" },
      { image_source: imageSource, label: "Tacoma", value: "Tacoma" },
      { image_source: imageSource, label: "Vancouver", value: "Vancouver" },
      { image_source: imageSource, label: "Bellevue", value: "Bellevue" },
      { image_source: imageSource, label: "Kent", value: "Kent" },
    ],
  },
  {
    category: {
      label: "Arizona",
      value: "AZ",
    },
    items: [
      { image_source: imageSource, label: "Pheonix", value: "Pheonix" },
      { image_source: imageSource, label: "Tucson", value: "Tucson" },
      { image_source: imageSource, label: "Mesa", value: "Mesa" },
      { image_source: imageSource, label: "Chandler", value: "Chandler" },
      { image_source: imageSource, label: "Gilbert", value: "Gilbert" },
      { image_source: imageSource, label: "Glendale", value: "Glendale" },
    ],
  },
];

export const NORTHERN_STATES = [
  {
    category: {
      label: "Illinois",
      value: "IL",
    },
    items: [
      { image_source: imageSource, label: "Chicago", value: "Chicago" },
      { image_source: imageSource, label: "Aurora", value: "Aurora" },
      { image_source: imageSource, label: "Joliet", value: "Joliet" },
      { image_source: imageSource, label: "Naperville", value: "Naperville" },
      { image_source: imageSource, label: "Rockford", value: "Rockford" },
      { image_source: imageSource, label: "Springfield", value: "Springfield" },
    ],
  },
  {
    category: {
      label: "Ohio",
      value: "OH",
    },
    items: [
      { image_source: imageSource, label: "Columbus", value: "Columbus" },
      { image_source: imageSource, label: "Cleveland", value: "Cleveland" },
      { image_source: imageSource, label: "Cincinnati", value: "Cincinnati" },
      { image_source: imageSource, label: "Toledo", value: "Toledo" },
      { image_source: imageSource, label: "Akron", value: "Akron" },
      { image_source: imageSource, label: "Dayton", value: "Dayton" },
    ],
  },
  {
    category: {
      label: "Michigan",
      value: "MI",
    },
    items: [
      { image_source: imageSource, label: "Detroit", value: "Detroit" },
      {
        image_source: imageSource,
        label: "Grand Rapids",
        value: "Grand Rapids",
      },
      { image_source: imageSource, label: "Warren City", value: "Warren City" },
      {
        image_source: imageSource,
        label: "Sterling Heights",
        value: "Sterling Heights",
      },
      { image_source: imageSource, label: "Ann Arbor", value: "Ann Arbor" },
      { image_source: imageSource, label: "Lansing", value: "Lansing" },
    ],
  },
];

export const SOUTHERN_STATES = [
  {
    category: {
      label: "Texas",
      value: "TX",
    },
    items: [
      { image_source: imageSource, label: "Houston", value: "Houston" },
      { image_source: imageSource, label: "San Antonio", value: "San Antonio" },
      { image_source: imageSource, label: "Dallas", value: "Dallas" },
      { image_source: imageSource, label: "Austin", value: "Austin" },
      { image_source: imageSource, label: "Fort Worth", value: "Fort Worth" },
      { image_source: imageSource, label: "El Paso", value: "El Paso" },
    ],
  },
  {
    category: {
      label: "Florida",
      value: "FL",
    },
    items: [
      {
        image_source: imageSource,
        label: "Jacksonville",
        value: "Jacksonville",
      },
      { image_source: imageSource, label: "Miami", value: "Miami" },
      { image_source: imageSource, label: "Tampa", value: "Tampa" },
      { image_source: imageSource, label: "Orlando", value: "Orlando" },
      {
        image_source: imageSource,
        label: "St. Petersburg",
        value: "St. Petersburg",
      },
      { image_source: imageSource, label: "Hialeah", value: "Hialeah" },
    ],
  },
  {
    category: {
      label: "Gorgia",
      value: "GA",
    },
    items: [
      { image_source: imageSource, label: "Atlanta", value: "Atlanta" },
      {
        image_source: imageSource,
        label: "Augusta-Richmond",
        value: "Augusta-Richmond",
      },
      { image_source: imageSource, label: "Columbus", value: "Columbus" },
      { image_source: imageSource, label: "Macon-Bibb", value: "Macon-Bibb" },
      { image_source: imageSource, label: "Savannah", value: "Savannah" },
      {
        image_source: imageSource,
        label: "South Fulton",
        value: "South Fulton",
      },
    ],
  },
];
