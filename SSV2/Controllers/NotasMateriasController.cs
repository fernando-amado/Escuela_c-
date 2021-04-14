using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using SSV2.Models;

namespace SSV2.Controllers
{
    [EnableCors(origins: "http://myclient.azurewebsites.net", headers: "*", methods: "*")]
    public class NotasMateriasController : ApiController
    {
        private SSDBV2Container db = new SSDBV2Container();

        // GET: api/NotasMaterias
        public IQueryable<NotasMateria> GetNotasMaterias()
        {
            return db.NotasMaterias;
        }

        // GET: api/NotasMaterias/5
        [ResponseType(typeof(NotasMateria))]
        public IHttpActionResult GetNotasMateria(int id)
        {
            NotasMateria notasMateria = db.NotasMaterias.Find(id);
            if (notasMateria == null)
            {
                return NotFound();
            }

            return Ok(notasMateria);
        }

        // PUT: api/NotasMaterias/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutNotasMateria(int id, NotasMateria notasMateria)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != notasMateria.Id)
            {
                return BadRequest();
            }

            db.Entry(notasMateria).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NotasMateriaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/NotasMaterias
        [ResponseType(typeof(NotasMateria))]
        public IHttpActionResult PostNotasMateria(NotasMateria notasMateria)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.NotasMaterias.Add(notasMateria);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = notasMateria.Id }, notasMateria);
        }

        // DELETE: api/NotasMaterias/5
        [ResponseType(typeof(NotasMateria))]
        public IHttpActionResult DeleteNotasMateria(int id)
        {
            NotasMateria notasMateria = db.NotasMaterias.Find(id);
            if (notasMateria == null)
            {
                return NotFound();
            }

            db.NotasMaterias.Remove(notasMateria);
            db.SaveChanges();

            return Ok(notasMateria);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool NotasMateriaExists(int id)
        {
            return db.NotasMaterias.Count(e => e.Id == id) > 0;
        }
    }
}