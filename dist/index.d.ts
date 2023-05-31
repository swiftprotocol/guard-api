import { Pool } from 'pg';
import { Analytics } from '@segment/analytics-node';
import { CronJob } from 'cron';
declare global {
    var sql: Pool;
    var analytics: Analytics;
    var job: CronJob;
}
