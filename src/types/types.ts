export interface FavouriteItem {
  id: string; // Unique identifier for the favourite item (e.g., item123)
  name: string; // Name of the item (e.g., "Sample Item")
  [key: string]: any; // Allows additional fields
}
