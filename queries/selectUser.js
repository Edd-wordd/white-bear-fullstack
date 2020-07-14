module.exports = function selectUser(email, password) {
   return `
     SELECT
        *
    FROM
        users
    WHERE
         users.email = '${email}'
         AND users.password = '${password}'
     LIMIT 1;
     
     `;
};
