export const PRODUCT_CATEGORIES = [
  { value: 'vegetables', label: 'Vegetables', icon: '🥬' },
  { value: 'fruits', label: 'Fruits', icon: '🍎' },
  { value: 'grains', label: 'Grains & Cereals', icon: '🌾' },
  { value: 'dairy', label: 'Dairy Products', icon: '🥛' },
  { value: 'pulses', label: 'Pulses & Lentils', icon: '🫘' },
  { value: 'spices', label: 'Spices & Herbs', icon: '🌶️' },
  { value: 'honey', label: 'Honey & Bee Products', icon: '🍯' },
  { value: 'eggs', label: 'Eggs & Poultry', icon: '🥚' },
  { value: 'flowers', label: 'Flowers & Plants', icon: '🌸' },
  { value: 'other', label: 'Other Products', icon: '📦' },
];

export const UNITS = [
  'kg',
  'gram',
  'liter',
  'ml',
  'dozen',
  'piece',
  'bunch',
  'bag',
];

export const ORDER_STATUS = {
  pending: { label: 'Pending', color: 'orange' },
  confirmed: { label: 'Confirmed', color: 'blue' },
  delivered: { label: 'Delivered', color: 'green' },
  cancelled: { label: 'Cancelled', color: 'red' },
};

export const PRODUCT_STATUS = {
  pending: { label: 'Pending Approval', color: 'orange' },
  verified: { label: 'Verified', color: 'green' },
  rejected: { label: 'Rejected', color: 'red' },
  sold: { label: 'Sold Out', color: 'gray' },
};
