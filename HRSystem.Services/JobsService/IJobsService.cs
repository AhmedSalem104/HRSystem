using HRSystem.Data;
using HRSystem.Data.Entites.Payroll;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRSystem.Services.JobsService
{
    public  interface IJobsService
    {
        List<Job> GetAll();
        short? GetMaxJobCode();

        List<Job> CheckJobNo(int? JobNo);
        Job GetJobById(int? id);
        bool Insert(Job Job);
        bool Update(Job Job);
        bool Delete(int id);

     
    }
}
