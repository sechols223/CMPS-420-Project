export interface FavoriteImage {
  id: string;
  title: string;
  imageUrl: string;
  dateAdded: string;
  tags: string[];
  description?: string;
}

export const mockFavorites: FavoriteImage[] = [
  {
    id: '1',
    title: 'Art Gallery Interior',
    imageUrl:
      'https://images.unsplash.com/photo-1557177324-56c542165309?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    dateAdded: '2024-03-15',
    tags: ['GALLERY', 'PAINTINGS', 'INTERIOR'],
    description: 'Beautiful gallery interior with classic paintings',
  },
  {
    id: '2',
    title: 'Museum Interior',
    imageUrl:
      'https://cdn.pixabay.com/photo/2019/07/03/09/41/national-history-museum-4314035_1280.jpg',
    dateAdded: '2024-03-14',
    tags: ['MUSEUM', 'ARCHITECTURE', 'INTERIOR'],
    description: 'The interior of the Natural History Museum in London',
  },
  {
    id: '3',
    title: 'Golden Retriever Puppy',
    imageUrl:
      'https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    dateAdded: '2024-03-13',
    tags: ['PUPPY', 'DOG', 'ANIMAL'],
    description: 'A closeup shot a golden retriever puppy',
  },
  {
    id: '3',
    title: 'AI Genrated Mouse',
    imageUrl:
      'https://cdn.pixabay.com/photo/2024/04/04/03/08/ai-generated-8674235_1280.png',
    dateAdded: '2024-03-13',
    tags: ['HUMOR', 'MOUSE', 'AUTOMOBILE'],
    description: 'A humorous AI generated mouse in a race car',
  },
  {
    id: '3',
    title: 'Tourist at Great Wall of China',
    imageUrl:
      'https://cdn.pixabay.com/photo/2020/08/12/19/28/great-wall-of-china-5483516_1280.jpg',
    dateAdded: '2024-11-09',
    tags: ['CHINA', 'LANDMARK', 'VACATION'],
    description:
      'An image of tourists having a great time at the Great Wall of China',
  },
  {
    id: '3',
    title: 'The Vatican',
    imageUrl:
      'https://cdn.pixabay.com/photo/2020/04/16/18/05/stairs-5051779_1280.jpg',
    dateAdded: '2024-10-13',
    tags: ['MUSEUM', 'ARCHITECTURE', 'INTERIOR'],
    description: 'A spiral staircase in the Vatican Museum',
  },
];
