﻿using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace newPSG.PMS.EntityDB
{
    [Table("CapSoThuTuc")]
    public class CapSoThuTuc : Entity
    {
        public int? TenantId { get; set; }
        public int? NhomThuTucId { get; set; }
        public int? ThuTucId { get; set; }
        public long? HoSoId { get; set; }
        public int Nam { get; set; }
        public int So { get; set; }
    }
}
