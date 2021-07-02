
import role from '../models/role';

export const createRoles = async () => {
    try {
        const count = await role.estimatedDocumentCount()

        if (count > 0) return;
        else {
            //new role({name: 'user'}).save();
            const values = await Promise.all(
                [
                    new role({ name: 'user' }).save(),
                    new role({ name: 'moderator' }).save(),
                    new role({ name: 'admin' }).save()
                ]
            )
            console.log(values)
        }
    }
     catch (error) {
         console.log(error)
     }

}
