const express = require('express');
const router = express.Router();
const members = require('../data/Members');
const uuid = require('uuid');

// Gets All Members
router.get('/', (request, response) => {
    response.status(200).json(members);
});

// Get Single Member
router.get('/:id', (request, response) => {
    const { id } = request.params;
    const found = members.some(m => m.id === parseInt(id));

    if (found) {
        response.status(200).json(members.filter(m => m.id === parseInt(id))[0]);
    } else {
        response.status(400).json({msg: 'Member Not Found'});
    }
});

// Create Member
router.post('/', (request, response) => {
    const newMember = {
        id: uuid.v4(),
        name: request.body.name,
        email: request.body.email,
        status: 1
    };

    if (!newMember.name || !newMember.email) {
        response.status(400).json({msg: 'Please include a name and email.'});
    }

    members.push(newMember);
    // response.json(members);
    response.redirect('/');
});

// Update Member
router.put('/:id', (request, response) => {
    const { id } = request.params;
    const found = members.some(m => m.id === parseInt(id));

    if (found) {
        const updateMember = request.body;
        members.forEach(member => {
            if (member.id === parseInt(id)) {
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email;
            }
            response.json({msg: 'Member updated!', member: member});
        })
    } else {
        response.status(400).json({msg: 'Member Not Found'});
    }
});

// Delete Member
router.delete('/:id', (request, response) => {
    const { id } = request.params;
    const found = members.some(m => m.id === parseInt(id));

    if (found) {
        response.status(200).json({mgs: 'Deleted Member', members: members.filter(m => m.id !== parseInt(id))});
    } else {
        response.status(400).json({msg: 'Member Not Found'});
    }
});


module.exports = router;