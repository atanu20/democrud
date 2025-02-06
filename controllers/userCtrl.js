const userTable = require('../models/user');




const userCtrl = {
  addUser: async (req, res) => {
    try {
      const { name, email, password , phone} = req.body;
      // console.log(req.body);
      const user = await userTable.findOne({ email });
      if (user)
        return res.json({ success: false, msg: 'This email already exists.' });

      if (password.length < 6)
        return res.json({
          success: false,
          msg: 'Password must be at least 6 characters.',
        });

      

      const newUser = new userTable({
        name,
        email,
        password,
        phone
      });

      await newUser.save();

      res.json({
        success: true,
        msg: 'Account has been created!',
        newUser,
      });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },

 
  getUserInfo: async (req, res) => {
    try {
      const uid = req.params.uid;
      

        const user = await userTable.findOne({_id:uid}).select('-password');
        return res.json({ success: true, data: user });

    } catch (err) {
      return res.json({success: false, msg: err.message });
    }
  },
  getAllUser: async (req, res) => {
    try {
      const user = await userTable
        .find()
        .select('-password');

        return res.json({ success: true, data: user });
    } catch (err) {
      return res.json({success: false, msg: err.message });
    }
  },
  updateUser:async(req,res)=>{
    try {
      const {name,phone }=req.body
      const uid = req.params.uid;

      const dat = await userTable.findOneAndUpdate(
        { _id: uid },
        {
              name,
              phone        
          

        },
        { new: true }
      );
      return res.json({ success: true, msg: 'Account Details Successfully Update', data:dat });
    } catch (error) {

      return res.json({ success: false, msg:error.message });
      
    }
  },
  deleteUser:async(req,res)=>{
    try {
      const uid = req.params.uid;

       const result = await userTable.findByIdAndRemove({ _id: uid });
      return res.json({ success: true, msg: 'User Deleted Successfully ' });
    } catch (error) {

      return res.json({ success: false, msg:error.message });
      
    }
  },
  
};



module.exports = userCtrl;


