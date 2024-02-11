import { Helmet } from 'react-helmet-async';

import { ReportsOverview } from 'src/sections/reports/view';

// ----------------------------------------------------------------------

export default function OverviewAnalyticsPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Reports</title>
      </Helmet>

      <ReportsOverview />
    </>
  );
}
