import { GraphQLError, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLSchema } from "graphql";
import { CompanyType, UserType } from "./types.js";
import User from "../database/models/userModel.js";
import Company from "../database/models/companyModel.js";

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      user: {
        type: UserType,
        args: { id: { type: GraphQLID } },
        async resolve(parent, args) {
          const user = await User.findById(args.id);
          if (!user) {
            throw new GraphQLError(`Can't find the user`);
          }
          return user;
        },
      },
      users:{
        type: new GraphQLList(UserType),
        async resolve(parent,args){
            const users = await User.find()
            return users
        }
      },
      company:{
        type:CompanyType,
        args: {id:{type:GraphQLID}},
        async resolve(parent,args){
            const company = await Company.findById(args.id)
            if (!company) {
            throw new GraphQLError(`Can't find the company`);
          }
          return company;
        }
      },
      companies:{
        type: new GraphQLList(CompanyType),
        async resolve(parent,args){
            const companies = await Company.find()
            return companies
        }
      }
    },
  }),
});
