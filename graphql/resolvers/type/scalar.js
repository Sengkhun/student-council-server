import { GraphQLDateTime } from 'graphql-iso-date';
import GraphQLJSON from 'graphql-type-json';
import { GraphQLUpload } from 'graphql-upload';

export default {
	Date: GraphQLDateTime,
	JSON: GraphQLJSON,
	Upload: GraphQLUpload
};
