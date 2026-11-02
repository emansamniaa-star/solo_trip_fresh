import PageHeader from '../components/common/PageHeader'
import ConversationList from '../components/messaging/ConversationList'
import { mockConversations } from '../data/mockMessages'

export default function MessagesPage() {
  return (
    <div className="px-5 py-12 sm:px-8 md:px-12">
      <PageHeader
        title="Messages"
        subtitle="Private conversations with potential travel companions."
      />
      <ConversationList conversations={mockConversations} />
    </div>
  )
}
