
    public partial class Mil
    {
        // [ForeignKey("Artigo")]
        [Key]
        public string milStamp { get; set; }
        public string nome { get; set; }
        public long nim { get; set; }
        public string nascData { get; set; }
        public string sexo { get; set; }
        public string grupSangue { get; set; }
        public string nacional { get; set; }
        public string nascPais { get; set; }
        public string nascProv { get; set; }
        public int codNascProv { get; set; }
        public string nascDist { get; set; }
        public int codNascDist { get; set; }
        public string nascPosto { get; set; }
        public int codNascPostAdm { get; set; }
        public string nascLocal { get; set; }
        public Nullable<int> codNascLocalidade { get; set; }
        public string nascPov { get; set; }
        public string pai { get; set; }
        public string mae { get; set; }
        public string estCivil { get; set; }
        public string regCasamento { get; set; }
        public string dataCasamento { get; set; }
        public string conjuge { get; set; }
        public Nullable<int> numFilhos { get; set; }
        public string habiLite { get; set; }
        public string resProv { get; set; }
        public int codResProv { get; set; }
        public string resDist { get; set; }
        public int codResDist { get; set; }
        public string resPosto { get; set; }
        public int codResPostAdm { get; set; }
        public string resLocalidade { get; set; }
        public Nullable<int> codResLocal { get; set; }
        public string resBairro { get; set; }
        public string resQuarteirao { get; set; }
        public string resAvenida { get; set; }
        public string numCasa { get; set; }
        public string ramo { get; set; }
        public int codRamo { get; set; }
        public string incPais { get; set; }
        public string incProv { get; set; }
        public int codIncProv { get; set; }
        public string incDist { get; set; }
        public int codIncDist { get; set; }
        public string incPosto { get; set; }
        public Nullable<int> codIncPostAdm { get; set; }
        public string incLocal { get; set; }
        public Nullable<int> codIncLocalidade { get; set; }
        public string incData { get; set; }
        public string inicioTreino { get; set; }
        public string terminoTreino { get; set; }
        public string duracaoTreino { get; set; }
        public string centroTreino { get; set; }
        public string cursoTreino { get; set; }
        public string adquirEspecial { get; set; }
        public string inseriu { get; set; }
        public DateTime? inseriuDataHora { get; set; }
        public string alterou { get; set; }
        public DateTime? alterouDataHora { get; set; }


        public virtual ICollection<Email> Email { get; set; }
        public virtual ICollection<Fornecimento> Fornecimento { get; set; }
        public virtual ICollection<MilAgre> MilAgre { get; set; }
        public virtual ICollection<MilConde> MilConde { get; set; }
        public virtual ICollection<MilDoc> MilDoc { get; set; }
        public virtual ICollection<MilEmail> MilEmail { get; set; }
        public virtual ICollection<MilEmFor> MilEmFor { get; set; }
        public virtual ICollection<MilEspecial> MilEspecial { get; set; }
        public virtual MilFa MilFa { get; set; }
        public virtual ICollection<MilFor> MilFor { get; set; }
        public virtual ICollection<MilFot> MilFot { get; set; }
        public virtual ICollection<MilFuncao> MilFuncao { get; set; }
        public virtual MilIDigital MilIDigital { get; set; }
        public virtual ICollection<MilLice> MilLice { get; set; }
        public virtual ICollection<MilLingua> MilLingua { get; set; }
     
        public virtual MilMed MilMed { get; set; }
        public virtual ICollection<MilPeEmerg> MilPeEmerg { get; set; }
        public virtual ICollection<MilRea> MilRea { get; set; }
        public virtual ICollection<MilReco> MilReco { get; set; }
        public virtual ICollection<MilReg> MilReg { get; set; }
        public virtual ICollection<MilRetReaSal> MilRetReaSal { get; set; }
        public virtual ICollection<MilSa> MilSa { get; set; }
   
        public virtual MilSalario MilSalario { get; set; }
        public virtual ICollection<MilSit> MilSit { get; set; }
        public virtual ICollection<MilSitCrim> MilSitCrim { get; set; }
        public virtual ICollection<MilSitDisc> MilSitDisc { get; set; }
        public virtual ICollection<MilSitQPActivo> MilSitQPActivo { get; set; }
        public virtual ICollection<Telefone> Telefone { get; set; }
        //public virtual Usuario Usuario { get; set; }
    }