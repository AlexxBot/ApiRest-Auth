import jwt from 'jsonwebtoken';
import config from '../config'
import role from '../models/role';
import user from '../models/user';

export const verifyToken = async (req, res, next) => {

    try {
        const token = req.headers["x-access-token"];


        if (!token) return res.status(403).json({ message: "No token provided" })

        const decoded = jwt.verify(token, config.SECRET)

        req.userId = decoded.id;

        const usuario = await user.findById(req.userId/* , { password: 0 } */)

        if (!usuario) return res.status(404).json({ message: 'no user found' })

        next();

    } catch (error) {
        return res.status(401).json({message : 'Unauthorized'});
    }

}


export const isModerator = async (req, res, next) => {
    const usuario = await user.findById(req.userId);

    const roles = await role.find({_id: {$in: user.roles }})
    console.log(roles);
    //next();

    for(let i = 0; i < roles.length; i++){
        if(roles[i] === "moderator"){
            next();
            return;
        }
    }

    return res.status(403).json({ message: "Require Moderator role"})
}

export const isAdmin = async (req, res, next) => {
    const usuario = await user.findById(req.userId);

    const roles = await role.find({_id: {$in: user.roles }})
    console.log(roles);
    //next();

    for(let i = 0; i < roles.length; i++){
        if(roles[i] === "admin"){
            next();
            return;
        }
    }

    return res.status(403).json({ message: "Require Admin role"})
    
}