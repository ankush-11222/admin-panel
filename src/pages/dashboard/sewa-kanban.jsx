import { Helmet } from 'react-helmet-async';

// import { OverviewAnalyticsView } from 'src/sections/overview/analytics/view';
import { SewaKanbanView } from 'src/sections/sewa-kanban/view';

// ----------------------------------------------------------------------

export default function OverviewAnalyticsPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Sewa</title>
      </Helmet>

      <SewaKanbanView />
    </>
  );
}
