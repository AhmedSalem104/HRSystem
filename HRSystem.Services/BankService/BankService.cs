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

namespace HRSystem.Services.BankService
{
    public class BankService : IBankService
    {
        #region Fields
        readonly PayrollEntities _context;
        #endregion
        public BankService(PayrollEntities context)
        {
            _context = context;
        }

        public List<Bank> GetAll()
        {
            _context.Configuration.ProxyCreationEnabled = false;
            return _context.Banks.ToList();
        }

        public Bank GetBankById(int? id)
        {
            return _context.Banks.Where(c => c.BankId == id).FirstOrDefault();
        }

        public short? GetMaxBankCode()
        {

            var CodeNotNull = _context.Banks.Max(a => a.BankId);
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


        public bool Insert(Bank Bank)
        {
            try
            {

                Bank.BankId = (byte)GetMaxBankCode();
                _context.Banks.Add(Bank);
                _context.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                var v = e.Message;
                return false;
            }
        }

        public bool Update(Bank Bank)
        {
            try
            {


                if (Bank == null)
                {
                    throw new ArgumentNullException("Bank");
                }

                _context.Entry(Bank).State = EntityState.Detached;
                _context.Entry(Bank).State = EntityState.Modified;
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

                var color = _context.Banks.FirstOrDefault(m => m.BankId == id);
                //_context.Entry(color).State = EntityState.Modified;
                _context.Entry(color).State = EntityState.Deleted;
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }


        public List<Bank> CheckBankNo(int? BankNo)
        {
            return _context.Banks.Where(a => a.BankId == BankNo).ToList();
        }


    }
}
