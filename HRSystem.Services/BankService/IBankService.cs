using HRSystem.Data;
using HRSystem.Data.Entites.Payroll;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRSystem.Services.BankService
{
    public  interface IBankService
    {
        List<Bank> GetAll();
        short? GetMaxBankCode();

        List<Bank> CheckBankNo(int? BankNo);
        Bank GetBankById(int? id);
        bool Insert(Bank Bank);
        bool Update(Bank Bank);
        bool Delete(int id);

     
    }
}
