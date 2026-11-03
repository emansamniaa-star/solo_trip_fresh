export const mockConversations = [
  {
    id: 'c1',
    withUser: 'Nour',
    tripLabel: 'Marrakech, Morocco',
    lastMessage: 'Would you be open to sharing the Atlas day?',
    updatedAt: '2026-10-28',
  },
  {
    id: 'c2',
    withUser: 'Sara',
    tripLabel: 'Istanbul, Turkey',
    lastMessage: 'I land on the 16th — we could overlap three days.',
    updatedAt: '2026-10-27',
  },
]

export const mockThread = [
  {
    id: 'm1',
    fromMe: false,
    text: 'Hi! I saw your Istanbul dates. I arrive a day later.',
  },
  {
    id: 'm2',
    fromMe: true,
    text: 'Welcome! Overlapping the 16th–19th works well for me.',
  },
  {
    id: 'm3',
    fromMe: false,
    text: 'Perfect — café morning on the first shared day?',
  },
]
