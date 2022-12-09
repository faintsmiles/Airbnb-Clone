import { faBuilding, faHotel, faHouse, faHouseUser } from '@fortawesome/free-solid-svg-icons'


// Overall filter options and types

// Options for bedrooms, beds, and bathrooms. Section name 'Rooms and beds'
export const roomOptions = ["Any", "1", "2", "3", "4", "5", "6", "7", "8+"];

// Property types available and their fontawesome icons
export const propertyOptions = [
  { type: "House", icon: faHouse, value: "House" },
  { type: "Apartment", icon: faBuilding, value: "Apartment" },
  { type: "Guesthouse", icon: faHouseUser, value: "Guesthouse" },
  { type: "Hotel", icon: faHotel, value: "Boutique hotel" },
];

// Objects containingg the subcategory title and list of options with title/descriptions for each respective choice available
export const typeOfRoom = {
  subcategory: "",
  items: [
    {
      title: "Entire Place",
      description: "A place all to yourself",
      value: "Entire home/apt",
    },
    {
      title: "Private Room",
      description:
        "Your own room in a home or a hotel, plus some shared common spaces",
      value: "Private room",
    },
    {
      title: "Shared Room",
      description:
        "A sleeping space and common areas that may be shared with others",
      value: "Shared room",
    },
  ],
};
export const amenities = [
  {
    subcategory: "Essentials",
    items: [
      { title: "Wireless Internet", description: "" },
      { title: "Kitchen", description: "" },
      { title: "Washer", description: "" },
      { title: "Dryer", description: "" },
      { title: "Air conditioning", description: "" },
      { title: "Heating", description: "" },
      { title: "TV", description: "" },
      { title: "Hair Dryer", description: "" },
      { title: "Iron", description: "" },
      { title: "Wheelchair accessible", description: "" },
    ],
  },
  {
    subcategory: "Features",
    items: [
      { title: "Pool", description: "" },
      { title: "Hot tub", description: "" },
      { title: "Free parking on premises", description: "" },
      { title: "EV charger", description: "" },
      { title: "Crib", description: "" },
      { title: "Gym", description: "" },
      { title: "BBQ grill", description: "" },
      { title: "Breakfast", description: "" },
      { title: "Indoor fireplace", description: "" },
      { title: "Smoking allowed", description: "" },
    ],
  },
  {
    subcategory: "Safety",
    items: [
      { title: "Smoke detector", description: "" },
      { title: "Carbon monoxide detector", description: "" },
    ],
  },
];
