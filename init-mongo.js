db.createUser({
  user: 'xuntos',
  pwd: 'xuntos',
  roles: [
    {
      role: 'readWrite',
      db: 'xuntos-auth'
    }
  ]
})
