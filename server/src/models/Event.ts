// import { DataTypes, type Sequelize, Model, type Optional, HasManyAddAssociationMixin, ForeignKey } from 'sequelize';



// interface EventAttributes {    
//     id: number;
//     eventName: string;
//     eventUrl: string;
//     eventDate: Date;
//     eventLongitude: string;
//     eventLatitude: string;
//     eventImage: string;
//     userID: number;
// }

// interface EventCreationAttributes extends Optional<EventAttributes, 'id'> {}

// export class Event
//     extends Model<EventAttributes, EventCreationAttributes>
//     implements EventAttributes {
//         public id!: number;
//         public eventName!: string;
//         public eventUrl!: string;
//         public eventDate!: Date;
//         public eventLongitude!: string;
//         public eventLatitude!: string;
//         public eventImage!: string;
//         public userID!: ForeignKey<User['id']>;

//         public readonly createdAt!: Date;
//         public readonly updatedAt!: Date;

//         declare addEvent: HasManyAddAssociationMixin<User, User['id']>;
//     }

//     export function initEvent(sequelize: Sequelize) {
//         Event.init(
//             {
//               id: {
//                 type: DataTypes.INTEGER,
//                 primaryKey: true,
//                 autoIncrement: true,
//               },
//               eventName: {
//                 type: DataTypes.STRING,
//                 allowNull: false,
//               },
//               eventUrl: {
//                 type: DataTypes.STRING,
//               },
//               eventDate: {
//                 type: DataTypes.DATE,
//                 allowNull: false,
//               },
//               eventLatitude: {
//                 type: DataTypes.STRING,
//               },
//               eventLongitude: {
//                 type: DataTypes.STRING,
//               },
//               eventImage: {
//                 type: DataTypes.STRING,
//               },
        
//               sequelize,
//               modelName: 'Event',
//               timestamps: false,
//             })};
          
//           export default Event;