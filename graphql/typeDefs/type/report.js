import { gql } from 'apollo-server-express';

export default gql`

  type Report {
    _id: ID!
    type: AllowReportType!
    name: String!
    url: String!
    createdAt: Date!
    status: Boolean!
  }

  type ReportResponse {
    ok: Boolean!
    report: Report
    error: Error
  }

  type ReportsResponse {
    ok: Boolean!
    reports: [Report!]!
    error: Error
  }
  
`;
