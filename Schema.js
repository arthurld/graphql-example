import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull
} from 'graphql';
import db from './db';

const Person = new GraphQLObjectType({
    name: 'Person',
    description: 'This represents a person',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(person) {
                    return person.id;
                }
            },
            firstName: {
                type: GraphQLString,
                resolve(person) {
                    return person.firstName;
                }
            },
            lastName: {
                type: GraphQLString,
                resolve(person) {
                    return person.lastName;
                }
            },
            email: {
                type: GraphQLString,
                resolve(person) {
                    return person.email;
                }
            },
            posts: {
                type: new GraphQLList(Post),
                resolve(person) {
                    return person.getPosts();
                }
            }
        }
    }
});

const Post = new GraphQLObjectType({
    name: "Post",
    description: "This represents a Post",
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(post) {
                    return post.id;
                }
            },
            title: {
                type: GraphQLString,
                resolve(post) {
                    return post.title;
                }
            },
            content: {
                type: GraphQLString,
                resolve(post) {
                    return post.content;
                }
            },
            person: {
                type: Person,
                resolve(post) {
                    return post.getPerson();
                }
            }
        }
    }
});

const Query = new GraphQLObjectType({
    name: "Query",
    description: "This is a root Query",
    fields: () => {
        return {
            people: {
                type: new GraphQLList(Person),
                args: {
                    id: {
                        type: GraphQLInt
                    },
                    email: {
                        type: GraphQLString
                    }
                },
                resolve(root, args) {
                    return db.models.people.findAll({where: args});
                }
            },
            posts: {
                type: new GraphQLList(Post),
                args: {
                    id: {
                        type: GraphQLInt
                    },
                    id_person: {
                        type: GraphQLInt
                    }
                },
                resolve(root, args) {
                    return db.models.posts.findAll({where: args});
                }
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    description: '',
    fields() {
        return {
            addPerson: {
                type: Person,
                args: {
                    firstName: {
                        type: new GraphQLNonNull(GraphQLString),
                    },
                    lastName: {
                        type: new GraphQLNonNull(GraphQLString),
                    },
                    email: {
                        type: new GraphQLNonNull(GraphQLString),
                    }
                },
                resolve(_, args) {
                    return db.models.people.create({
                        firstName: args.firstName,
                        lastName: args.lastName,
                        email: args.email.toLowerCase()
                    })
                }
            },
            addPost: {
                type: Post,
                args: {
                    title: {
                        type: new GraphQLNonNull(GraphQLString),
                    },
                    content: {
                        type: new GraphQLNonNull(GraphQLString),
                    },
                    id_person: {
                        type: new GraphQLNonNull(GraphQLInt),
                    }
                },
                resolve(_, args) {
                    return db.models.posts.create({
                        title: args.title,
                        content: args.content,
                        id_person: args.id_person
                    })
                }
            }
        }
    }
})

const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

export default Schema;
