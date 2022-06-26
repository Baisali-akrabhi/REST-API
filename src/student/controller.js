const pool = require('../../db');
const queries = require('./queries');

const getStudents = (req, res) => {
    pool.query(queries.getStudents, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    });
};
const getStudentsById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentsById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    });
};
const addStudents = (req, res) => {
    const { name, email, age, dob } = req.body;
    // check email is exist
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (results.rows.length) {
            res.send("Email already exist !!");
        } else {
            // add studens to DB
            pool.query(
                queries.addStudents,
                [name, email, age, dob],
                (error, results) => {
                    if (error) throw error;
                    res.status(201).send("students created Successfully !!");
                })
        }
    });
};

const removeStudent = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getStudentsById, [id], (error, results) => {
        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
            res.send("Student does not exist in the database");
        }
        pool.query(queries.removeStudent, [id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Student Removes Successfully.");
        })

    })
}
const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const {name} = req.body;

    pool.query(queries.getStudentsById, [id], (error, results) => {
        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
            res.send("Student does not exist in the database");
        }
        pool.query(queries.updateStudent, [name, id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Student Updated Successfully.");
        })

    })

}

module.exports = {
    getStudents,
    addStudents,
    getStudentsById,
    removeStudent,
    updateStudent,
};