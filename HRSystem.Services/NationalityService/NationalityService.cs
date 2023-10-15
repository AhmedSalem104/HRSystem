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

namespace HRSystem.Services.NationalityService
{
    public class NationalityService : INationalityService
    {
        #region Fields
        readonly PayrollEntities _context;
        #endregion
        public NationalityService(PayrollEntities context)
        {
            _context = context;
        }

        public List<Nationality> GetAll()
        {
            _context.Configuration.ProxyCreationEnabled = false;
            return _context.Nationalities.ToList();
        }

        public Nationality GetNationalityById(int? id)
        {
            return _context.Nationalities.Where(c => c.NatId == id).FirstOrDefault();
        }

        public short? GetMaxNationalityCode()
        {

            var ColorCodeNotNull = _context.Nationalities.Max(a => a.NatId);
            if (ColorCodeNotNull != null)
            {
                return ((short?)(ColorCodeNotNull + 1));
            }
            else
            {
                var colorCodeNull = 1;
                return ((short?)colorCodeNull);

            }
        }


        public bool Insert(Nationality Nationality)
        {
            try
            {

                Nationality.Uploaded = false;
                Nationality.IsSaudi = false;
                Nationality.IdNoCheck = false;
                Nationality.EMP_NATIONALITY = Nationality.CountryCode;
                Nationality.NatId = (short)GetMaxNationalityCode();
                _context.Insert_Update_Select_Delete_Nationalities(Nationality.NatId, Nationality.NatName, Nationality.IsSaudi, Nationality.IdNoCheck, Nationality.CountryCode, Nationality.EMP_NATIONALITY,Nationality.Uploaded,"Insert");

                return true;

            }
            catch (Exception e)
            {
                var x = e;
                return false;
            }
        }

        public bool Update(Nationality Nationality)
        {
            try
            {


                if (Nationality == null)
                {
                    throw new ArgumentNullException("Nationality");
                }

                var GetId = _context.Nationalities.FirstOrDefault(m => m.NatId == Nationality.NatId);

                if (GetId != null)
                {
                    _context.Insert_Update_Select_Delete_Nationalities(Nationality.NatId, Nationality.NatName, Nationality.IsSaudi, Nationality.IdNoCheck, Nationality.CountryCode, Nationality.EMP_NATIONALITY, Nationality.Uploaded, "Update");

                }
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

                var Nationality = _context.Nationalities.FirstOrDefault(m => m.NatId == id);
                _context.Insert_Update_Select_Delete_Nationalities(Nationality.NatId, Nationality.NatName, Nationality.IsSaudi, Nationality.IdNoCheck, Nationality.CountryCode, Nationality.EMP_NATIONALITY, Nationality.Uploaded, "Delete");

                return true;
            }
            catch
            {
                return false;
            }
        }


        //public bool CheckDelete(int id)
        //{
        //    try
        //    {
        //        var NatId = _context.Employees.FirstOrDefault(a => a.NatId == id);
        //        if (NatId == null)
        //        {
        //            var Nationality = _context.Nationalities.FirstOrDefault(m => m.NatId == id);
        //            _context.Insert_Update_Select_Delete_Nationalities(Nationality.NatId, Nationality.NatName, Nationality.IsSaudi, Nationality.IdNoCheck, Nationality.CountryCode, Nationality.EMP_NATIONALITY, Nationality.Uploaded, "Delete");
        //        }


        //        return false;




        //    }
        //    catch
        //    {
        //        return false;
        //    }
        //}


        public List<Nationality> CheckNationalityNo(int? NationalityNo)
        {
            return _context.Nationalities.Where(a => a.NatId == NationalityNo).ToList();
        }


    }
}
