using HRSystem.Data;
using HRSystem.Data.Entites.Payroll;
using HRSystem.Services.DTO;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRSystem.Services.DecisionEndStopHandService
{
    public class DecisionEndStopHandService : IDecisionEndStopHandService
    {
        #region Fields
        readonly PayrollEntities _context;
        #endregion
        #region Constructors
        public DecisionEndStopHandService(PayrollEntities context)
        {
            _context = context;

        }

        #endregion


        #region Methods
        public List<DecisionEndStopHandDTO> GetAll()
        {

            var servicesTrxList = (from DESH in _context.DecisionEndStopHands
                                   join E in _context.Employees on DESH.EmpId equals E.EmpID
                                   
                                   select new DecisionEndStopHandDTO()
                                   {
                                       DecisionEndStopHandID = DESH.DecisionEndStopHandID,
                                       DateH = DESH.DateH,
                                       EmpName = E.EmpName,
                                       EnclosureCount = DESH.EnclosureCount,
                                       Notes = DESH.Notes,
                                       StartDateH = DESH.StartDateH,
                                       Subject = DESH.Subject,
                                       PublishedFrom = DESH.PublishedFrom
                                       



                                   }).ToList();
            return servicesTrxList;


        }

        public DecisionEndStopHand GetDecisionEndStopHandById(int? id)
        {
            return _context.DecisionEndStopHands.Where(c => c.DecisionEndStopHandID == id).FirstOrDefault();
        }

        public int? GetMaxDecisionEndStopHandCode()
        {
            //return _context.Warning.Max(a => a.WarnCode) + 1;
           
            var CodeNotNull = _context.DecisionEndStopHands.Count();
            if (CodeNotNull != 0)
            {
                var Code = _context.DecisionEndStopHands.Max(a => a.DecisionEndStopHandID);

                return (Code + 1);
            }


            else
            {
                var CodeNull = 1;
                return (CodeNull);

            }
        }



        public List<EmployeeListForDecisionEndStopHandDTO> GetEmployeeList()
        {

            var List = (from DSH in _context.DecisionStopHands
                           join QE in _context.QEmployees on DSH.EmpId equals QE.EmpID

                           select new EmployeeListForDecisionEndStopHandDTO()
                           {
                             
                               EmpID = DSH.EmpId,
                               EmpName = QE.EmpName,
                        





                           }).ToList();


            return List  ;
        }


        public bool Insert(DecisionEndStopHand DecisionEndStopHand)
        {
            try
            {

                _context.DecisionEndStopHands.Add(DecisionEndStopHand);
                _context.SaveChanges();
                return true;

            }
            catch
            {
                return false;
            }
        }

        public bool Update(DecisionEndStopHand DecisionEndStopHand)
        {
            try
            {


                if (DecisionEndStopHand == null)
                {
                    throw new ArgumentNullException("DecisionEndStopHand");
                }
                _context.Entry(DecisionEndStopHand).State = EntityState.Detached;
                _context.Entry(DecisionEndStopHand).State = EntityState.Modified;
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

                var driver = _context.DecisionEndStopHands.FirstOrDefault(m => m.DecisionEndStopHandID == id);
                _context.Entry(driver).State = EntityState.Deleted;
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }


        public string AddDaysToDate(DateTime dateTime, int days)
        {
            if (days == 0)
            {
                var ItemList1 = dateTime.AddDays(days);
                return ItemList1.Date.ToString("yyyy-MM-dd");
            }
            var ItemList2 = dateTime.AddDays(days-1);
            return ItemList2.Date.ToString("yyyy-MM-dd");
        }

        //public List<DriverDto> GetDriverByIdForPrint(int id)
        //{
        //    var driver = (from d in _context.List
        //                  join n in _context.Nationalities on d.NationalitiesNationalId equals n.NationalId into nGroup
        //                  from n in nGroup.DefaultIfEmpty()
        //                  join lt in _context.LicenseTypes on d.LicenseTypeId equals lt.Id into ltGroup
        //                  from lt in ltGroup.DefaultIfEmpty()
        //                  join br in _context.Branches on d.BranchesId equals br.Id into brGroup
        //                  from br in brGroup.DefaultIfEmpty()
        //                  select new DriverDto()
        //                  {
        //                   Id = d.Id,
        //                   DriverName = d.DriverName,
        //                   DriverNo = (int)(d.DriverNo != null ? d.DriverNo : 0),
        //                   LicenseNo = d.LicenseNo,
        //                   LicensePlace = d.LicensePlace,
        //                   LicenseReleaseDateH = d.LicenseReleaseDateH,
        //                   LicenseEndDateH = d.LicenseEndDateH,
        //                   Phone = d.Phone,
        //                   MobileCode = d.MobileCode,
        //                   NatName = n.NatName,
        //                   LicenseTypeNameName = lt.LicenseTypeNameName,
        //                   BrancheName = br.BranchesName

        //               }).Where(a => a.Id == id).ToList();


        //    return driver;
        //}
        //public List<DriverDto> GetAllListForPrint()
        //{
        //    var driver = (from d in _context.List
        //               join n in _context.Nationalities on d.NationalitiesNationalId equals n.NationalId into nGroup
        //               from n in nGroup.DefaultIfEmpty()
        //               join lt in _context.LicenseTypes on d.LicenseTypeId equals lt.Id into ltGroup
        //               from lt in ltGroup.DefaultIfEmpty()
        //               select new DriverDto()
        //               {
        //                   Id = d.Id,
        //                   DriverName = d.DriverName,
        //                   DriverNo = (int)(d.DriverNo != null ? d.DriverNo : 0),
        //                   LicenseNo = d.LicenseNo,
        //                   LicensePlace = d.LicensePlace,
        //                   LicenseReleaseDateH = d.LicenseReleaseDateH,
        //                   LicenseEndDateH = d.LicenseEndDateH,
        //                   Phone = d.Phone,
        //                   MobileCode = d.MobileCode,
        //                   NatName = n.NatName,
        //                   LicenseTypeNameName = lt.LicenseTypeNameName,


        //               }).ToList();


        //    return driver;
        //}




        //public List<LicenseTypes_Tbl> GetLicenseTypeList()
        //{
        //    return _context.LicenseTypes.Where(a => a.IsDeleted == false).ToList();
        //}
        //public List<Nationalities> GetNationalList()
        //{
        //    return _context.Nationalities.Where(a => a.IsDeleted == false).ToList();
        //}





        //public List<List> CheckDriverNo(int? DriverNo)
        //{
        //    return _context.List.Where(a => a.DriverNo == DriverNo & a.IsDeleted == false).ToList();
        //}


        //public DriverDto GetDriverDetailsById(int id)
        //{
        //    var driver = (from d in _context.List
        //                  join n in _context.Nationalities on d.NationalitiesNationalId equals n.NationalId into nGroup
        //                  from n in nGroup.DefaultIfEmpty()
        //                  join lt in _context.LicenseTypes on d.LicenseTypeId equals lt.Id into ltGroup
        //                  from lt in ltGroup.DefaultIfEmpty()
        //                  join br in _context.Branches on d.BranchesId equals br.Id into brGroup
        //                  from br in brGroup.DefaultIfEmpty()
        //                  select new DriverDto()
        //                  {
        //                      Id = d.Id,
        //                      DriverName = d.DriverName,
        //                      DriverNo = (int)(d.DriverNo != null ? d.DriverNo : 0),
        //                      LicenseNo = d.LicenseNo,
        //                      LicensePlace = d.LicensePlace,
        //                      LicenseReleaseDateH = d.LicenseReleaseDateH,
        //                      LicenseEndDateH = d.LicenseEndDateH,
        //                      Phone = d.Phone,
        //                      MobileCode = d.MobileCode,
        //                      NatName = n.NatName,
        //                      LicenseTypeNameName = lt.LicenseTypeNameName,
        //                      BrancheName = br.BranchesName

        //                  }).FirstOrDefault(a => a.Id == id);


        //    return driver;
        //}


        //public List<DriverDto> GetDriverDetailsForPrintReport(DateTime? EndDate, int? BranchId)
        //{
        //    var Licence = (from D in _context.List
        //                    join B in _context.Branches on D.BranchesId equals B.Id into BGroup
        //                    from B in BGroup.DefaultIfEmpty()
        //                    join N in _context.Nationalities on D.NationalitiesNationalId equals N.NationalId into NGroup
        //                    from N in NGroup.DefaultIfEmpty()
        //                    join LT in _context.LicenseTypes on D.LicenseTypeId equals LT.Id into LTGroup
        //                    from LT in LTGroup.DefaultIfEmpty()
        //                    select new DriverDto()
        //                  {
        //                      Id = D.Id,
        //                      BrancheName = B.BranchesName,
        //                      DriverName = D.DriverName,
        //                      DriverNo = (int)(D.DriverNo != null ? D.DriverNo : 0),
        //                      LicenseEndDateH = D.LicenseEndDateH,
        //                      LicenseNo = D.LicenseNo,
        //                      LicenseReleaseDateH = D.LicenseReleaseDateH,
        //                      LicensePlace = D.LicensePlace,
        //                      LicenseTypeNameName = LT.LicenseTypeNameName,
        //                      NatName = N.NatName,
        //                      Phone = D.Phone,
        //                      MobileCode = D.MobileCode,
        //                      BrancheId = (int)(D.BranchesId != null ? D.BranchesId : 0) ,
        //                      LicenseTypeNameId = (int)(D.LicenseTypeId != null ? D.LicenseTypeId : 0) ,
        //                      NationalId = (int)(D.NationalitiesNationalId != null ? D.NationalitiesNationalId : 0) ,
        //                      LicenseEndDate = (DateTime)(D.LicenseEndDate != null ? D.LicenseEndDate : DateTime.Now),
        //                      LicenseReleaseDate = (DateTime)(D.LicenseReleaseDate != null ? D.LicenseReleaseDate : DateTime.Now) ,
        //                      Notes = D.Notes



        //                  }).Where(i => (i.BrancheId == BranchId || BranchId == null) && (i.LicenseEndDate <= EndDate || EndDate == null)).ToList();


        //    return Licence;
        //}
        public List<Owner> GetOwnerList()
        {
            return _context.Owners.ToList();
        }
        public List<DecisionEndStopHandDTO> SearchListForPrint()
        {
            var Licence = (from DESH in _context.DecisionEndStopHands
                           join QE in _context.QEmployees on DESH.EmpId equals QE.EmpID
                           join O in _context.Owners on DESH.Owner equals O.OwnerId

                           select new DecisionEndStopHandDTO()
                           {
                               DecisionEndStopHandID = DESH.DecisionEndStopHandID,
                               Owner = DESH.Owner,
                               OwnerName = O.OwnerName,
                               EmpId = DESH.EmpId,
                               EmpName = QE.EmpName,
                               ClassID = QE.ClassID,
                               ClassName = QE.ClassName,
                               JobName = QE.JobName,
                               JobLocationName = QE.JobLocationName,
                               DepartmentName = QE.DepartmentName,                           
                               DegreeID = QE.DegreeID,

                               Subject = DESH.Subject,
                               DateH = DESH.DateH,
                               EnclosureCount = DESH.EnclosureCount,
                               PublishNumber = DESH.PublishNumber,
                               PublishDateH = DESH.PublishDateH,
                               PublishedFrom = DESH.PublishedFrom,
                               Notes = DESH.Notes,
                               StartSalary = QE.StartSalary,
                               SalaryStartDateH = DESH.SalaryStartDateH,
                               Reason = DESH.Reason,
                               Serial = DESH.Serial,
                               StartDateH = DESH.StartDateH,
                               Approval = DESH.Approval
                   




                           }).ToList();



            return Licence;

        }

        public List<DecisionEndStopHandDTO> GetDecisionEndStopHandForPrint(int[] ids)
        {
            var List = SearchListForPrint().Where(a => ids.Contains(a.DecisionEndStopHandID)).ToList();
            return List;
        }


        //public int DriverHaveCar(int DriverID)
        //{
        //    var allList = _context.CarList.Where(a => a.DriverID == DriverID).ToList().OrderByDescending(a => a.Id);
        //    var Driver = allList.FirstOrDefault();

        //    if (Driver != null)
        //    {
        //        if (Driver.TrxType == 1)
        //        {

        //            return 1;

        //        }
        //        else {
        //            return 2;
        //        }
        //    }
        //    return 2;
        //}


        public EmployeeInfoDTO GetEmployeeDetailsById(int? id)
        {
          
         var  car = (from E in _context.Employees 
                   join J in _context.Jobs on E.JobID equals J.JobID
                     join D in _context.Departments on E.DepartmentID equals D.DepartmentID
                     join JL in _context.JobLocations on E.JobLocationID equals JL.JobLocationID

                     select new EmployeeInfoDTO()
                   {
                       EmpID= E.EmpID,
                       EmpName = E.EmpName,
                       JobName = J.JobName,
                       ClassID = E.ClassID,
                       DegreeID = E.DegreeID,
                       DepartmentName = D.DepartmentName,
                       JobLocationName = JL.JobLocationName,
                       ContractDateH = E.ContractDateH,



                   }

                      ).FirstOrDefault(a=>a.EmpID == id);
            return car;
        }



        public int GetMaxId()
        {
            var count = _context.DecisionEndStopHands.ToList();
            var id = 0;
            if (count.Count() != 0)
            {
                id = _context.DecisionEndStopHands.Max(a => a.DecisionEndStopHandID);
                return id;
            }
            return id;
        }


    }
    #endregion
}

