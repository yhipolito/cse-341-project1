const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const lists = await mongodb
      .getDatabase()
      .db()
      .collection('contacts')
      .find()
      .toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(400).json({ message: err.message || err });
  }
};

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid contact id to find a contact.');
  }
  
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: userId }).toArray();
  
  if (result.length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } else {
    res.status(404).json('Contact not found.');
  }
};

const createContact = async (req, res) => {
    //#swagger.tags = ['Contacts'];
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
};

const updateContact = async (req, res) => {
    //#swagger.tags = ['Contacts'];
    if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to update a contact.');
    }
    const contactId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({ _id: contactId }, contact);
    if (response.matchedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
};

const deleteContact = async (req, res) => { 
    //#swagger.tags = ['Contacts'];
    if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to delete a contact.');
    }
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: contactId });
    if (response.deletedCount > 0) {
    res.status(204).send();
    } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact,
};