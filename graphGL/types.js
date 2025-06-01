import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import User from "../database/models/userModel.js";
import Company from "../database/models/companyModel.js";

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      async resolve(parent) {
        if (!parent.companyId) return null;
        return await Company.findById(parent.companyId);
      },
    },
  }),
});

export const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    name: { type: GraphQLString },
    slogan: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      async resolve(parent) {
        return await User.find({ companyId: parent._id });
      },
    },
  }),
});
