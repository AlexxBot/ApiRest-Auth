import user from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../config';
import role from '../models/role';
import { json } from 'express';

export const signUp = async (req, res) => {

    const { username, email, password, roles } = req.body;
    //console.log(req.body);

    //const userFound = user.find({email})

    const newUser = new user({
        username, email, password: await user.encryptPassword(password),
        roles
    })

    if (roles) {
        const foundRole = await role.find({ name: { $in: roles } })
        newUser.roles = foundRole.map(rol => rol._id)
    } else {
        const rol = await role.findOne({ name: "user" })
        newUser.roles = [rol._id];

    }
    const userSaved = await newUser.save();
    console.log(newUser);

    const token = jwt.sign({ id: userSaved._id }, config.SECRET, {
        expiresIn: 86400 // este en segundos
    })
    res.status(200).json({ token });
}

export const signIn = async (req, res) => {
    //console.log('este mensaje es del signIn', req.body)
    const userFound = await user.findOne({email: req.body.email}).populate("roles");
    if(!userFound){
        return res.status(404).json({message: "User not found"})
    }
    //const pass = await user.encryptPassword(req.body.password);
    //console.log(pass);
    //console.log(userFound.password);
    const matchPassword = await user.comparePassword(req.body.password, userFound.password);

    if(!matchPassword) return res.status(401).json({token: null, message: 'Invalid password'});

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 86400 // este en segundos
    })

    console.log(userFound)
    res.json({ token })
}

export const setUserName = async (req, res) => {

    const updatedUser = await user.findOneAndUpdate({email: req.body.email}, {$set:{ username: req.body.username }}, 
    {
        select: "email username",
        new: true// esto es para obtner los nuevos datos actulaizados, si esta en falso te delvuelve el anterior
    })
    res.status(200).json(updatedUser);
}