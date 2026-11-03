export const mockStories = [
  {
    id: 's1',
    title: 'Feeling safe in Amman’s downtown evenings',
    author: 'Layla',
    place: 'Amman, Jordan',
    excerpt:
      'Stick to well-lit streets near Rainbow Street, share your live location with a friend, and ask locals which taxis they trust.',
    tag: 'Safety',
    body: 'I arrived after sunset and felt nervous at first. Staying on busy, lit streets and messaging a friend my location every hour made a big difference. Hotel staff also recommended trusted taxi numbers — ask before you need them.',
  },
  {
    id: 's2',
    title: 'Budget mornings in Marrakech',
    author: 'Nour',
    place: 'Marrakech, Morocco',
    excerpt:
      'Skip hotel breakfast once — fresh juice and msemen from a neighborhood stall costs little and starts conversations.',
    tag: 'Budget',
    body: 'One morning outside the tourist belt taught me more than any guidebook. A small stall, a smile, and patience with language went further than rushing through a packed itinerary.',
  },
  {
    id: 's3',
    title: 'A quiet ferry hour in Istanbul',
    author: 'Sara',
    place: 'Istanbul, Turkey',
    excerpt:
      'Take the morning ferry to Kadıköy before the rush. Pack a scarf, sit outdoors, and watch the city wake up slowly.',
    tag: 'Tips',
    body: 'The early ferry is my reset button on city trips. Less noise, softer light, and time to decide the day without pressure.',
  },
  {
    id: 's4',
    title: 'Dress and respect in Muscat markets',
    author: 'Huda',
    place: 'Muscat, Oman',
    excerpt:
      'Modest clothing kept me comfortable in souqs and mosques. Packing a light scarf saved space and stress.',
    tag: 'Etiquette',
    body: 'I felt more at ease when my clothes matched the local tone. It was not about fear — it was about respect and blending in so I could enjoy conversations longer.',
  },
]

export function getStoryById(storyId) {
  return mockStories.find((story) => story.id === String(storyId))
}
