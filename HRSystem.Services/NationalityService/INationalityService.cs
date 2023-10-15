using HRSystem.Data;
using HRSystem.Data.Entites.Payroll;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRSystem.Services.NationalityService
{
    public  interface INationalityService
    {
        List<Nationality> GetAll();
        short? GetMaxNationalityCode();

        List<Nationality> CheckNationalityNo(int? NationalityNo);
        Nationality GetNationalityById(int? id);
        bool Insert(Nationality Nationality);
        bool Update(Nationality Nationality);
        bool Delete(int id);
        //bool CheckDelete(int id);



    }
}
