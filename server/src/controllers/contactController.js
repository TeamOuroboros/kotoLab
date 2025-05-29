const SuggestLog = require('../models/SuggestLog')


const createLog = async (req,res) => {
  try{
    
  }catch(error){
    console.log('error: ', error);
    return res.status(500).json({ message: 'Server Error' });
  }
}
const getLog = async (req,res) => {}
const contactGemini = async (req,res) => {}

module.exports = {createLog,getLog,contactGemini}