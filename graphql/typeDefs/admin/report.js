import { gql } from 'apollo-server-express';

export default gql`

  type Mutation {

    adminGenerateReport(
      type: AllowReportType
      from: Date
      to: Date
    ): ReportResponse!

  }

`;