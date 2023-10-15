using HRSystem.Data;
using HRSystem.Data.Entites.Payroll;
//using HRSystem.Data.Entites;
using HRSystem.Services;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Text;
using System.Threading.Tasks;

namespace HRSystem.Services.JobsService
{
    public class JobsService : IJobsService
    {
        #region Fields
        readonly PayrollEntities _context;
        #endregion
        public JobsService(PayrollEntities context)
        {
            _context = context;
        }

        public List<Job> GetAll()
        {
            _context.Configuration.ProxyCreationEnabled = false;
            return _context.Jobs.ToList();
        }

        public Job GetJobById(int? id)
        {
            return _context.Jobs.Where(c => c.JobID == id).FirstOrDefault();
        }

        public short? GetMaxJobCode()
        {

            var CodeNotNull = _context.Jobs.Max(a => a.JobID);
            if (CodeNotNull != null)
            {
                return ((short?)(CodeNotNull + 1));
            }
            else
            {
                var CodeNull = 1;
                return ((short?)CodeNull);

            }
        }


        public bool Insert(Job Job)
        {
            try
            {
                
                Job.FixedNatureAllow = false;
                Job.JobID = (short)GetMaxJobCode();
                _context.Jobs.Add(Job);
                _context.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                var v = e.Message;
                return false;
            }
        }

        public bool Update(Job Job)
        {
            try
            {


                if (Job == null)
                {
                    throw new ArgumentNullException("Job");
                }
                Job.FixedNatureAllow = false;
                _context.Entry(Job).State = EntityState.Detached;
                _context.Entry(Job).State = EntityState.Modified;
                _context.SaveChanges();
                return true;

            }
            catch 
            {
                
                return false;
            }

        }
        public bool Delete(int id)
        {
            try
            {

                var Job = _context.Jobs.FirstOrDefault(m => m.JobID == id);
                //_context.Entry(color).State = EntityState.Modified;
                _context.Entry(Job).State = EntityState.Deleted;
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }


        public List<Job> CheckJobNo(int? JobNO)
        {
            return _context.Jobs.Where(a => a.JobID == JobNO).ToList();
        }


    }
}
