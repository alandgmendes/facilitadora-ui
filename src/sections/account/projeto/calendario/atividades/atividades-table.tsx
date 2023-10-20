import React from 'react';
import { Card, Stack, Typography, TablePagination } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { useRouter } from 'next/router';
import { Button, Box, Grid, colors } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { TransitionProps } from '@mui/material/transitions';
import { updateCronogramaAtividades } from '../../../../../scripts/projetos/cronogramas/atividades/cronograma.atividades.updater';
import { createCronogramaAtividades } from '../../../../../scripts/projetos/cronogramas/atividades/cronograma.atividades.create';


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Task {
  _id: string;
  atividade: string;
  descricaoAtividade: string;
  periodoInicial: string;
  periodoFinal: string;
  criadaEm: string,
  modificadaEm: string,
  acessadaEm: string,
  cronogramaId: string,
  etapa: string,
}
//---------------end of new

interface CronogramaTableProps {
  onSelectAll: (e: MouseEvent<HTMLButtonElementz>) => void;
  onDeSelectAll: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onSelectOne: (taskId: String) => void;
  onDeSelectOne: (taskId: String) => void;
  selected: never[];
  onPageChange: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onRowsPerPageChange: (e: React.MouseEvent<HTMLButtonElement>) => void;
  page: Number;
  rowsPerPage: Number;
}

const getEtapaCaption = (etapa: string) => {
  switch (etapa) {
    case 'preproducao':
      return 'Pré-produção';
    case 'producao':
      return 'Produção';
    case 'posproducao':
      return 'Pós-produção';
    default:
      return etapa;
  }
};

function CronogramaTable({ onSelectAll, onDeSelectAll, onSelectOne, onDeSelectOne, onPageChange, onRowsPerPageChange, page, rowsPerPage, selected }: CronogramaTableProps) {
  const router = useRouter();
  const cronogramaId = router.query.cronogramaId?.toString();
  const token = window.sessionStorage.getItem('token') || '';
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdittingTask, setIsEditingTask] = useState(false);
  const [editingTask, setEditingTask] = useState<Task>();
  const [editingTaskNome, setEditingTaskNome] = useState('');
  const [editingTaskDescricao, setEditingTaskDescricao] = useState('');
  const [editingTaskPeriodoInicial, setEditingTaskPeriodoInicial] = useState(1);
  const [editingTaskPeriodoFinal, setEditingTaskPeriodoFinal] = useState(2);
  const [editingTaskId, setEditingTaskId] = useState('');
  const [editingTaskEtapa, setEditingTaskEtapa] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  let taskEdited = {
    atividade:'',
    descricaoAtividade:'',
    etapa: '',
    periodoInicial: 1,
    periodoFinal: 2,
    criadaEm: '',
    modificadaEm: '',
    acessadaEm: '',
    cronogramaId: '',
    _id:''
  }
//----------------------
const handleClickOpen = () => {
  setOpen(true);
  handleIsEditing();
};

const handleClose = () => {
  setOpen(false);
  handleIsEditing();
};

const handleIsEditing = () => {
  setIsEditingTask((prevIsEditingTask) => !prevIsEditingTask);
};

const onEditClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
  const idTask =  e.currentTarget.id;
  const taskToEdit = tasks.find(task => task._id === idTask);
  debugger;
  setEditingTaskId(e.currentTarget.id);
  setEditingTaskNome(taskToEdit?.atividade || "");
  setEditingTaskEtapa(taskToEdit?.etapa || "");
  setEditingTaskDescricao(taskToEdit?.descricaoAtividade || "");
  setEditingTaskPeriodoFinal(parseInt(taskToEdit?.periodoFinal || '0'));
  setEditingTaskPeriodoInicial(parseInt(taskToEdit?.periodoInicial || '0'));
  handleClickOpen();
}

const onDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) =>{
  console.log(e.currentTarget.id);
}

const onSaveEditClick = (e: React.MouseEvent<HTMLButtonElement>) =>{
  console.log(e.currentTarget.id);
}

const onCancelEditClick = (e: React.MouseEvent<HTMLButtonElement>) =>{
  console.log(e.currentTarget.id);
}

const handleSave = async() => {
  const idCronograma = cronogramaId;
  if(editingTaskId){
    taskEdited.atividade = editingTaskNome;
    taskEdited.descricaoAtividade = editingTaskDescricao;
    taskEdited.periodoInicial = editingTaskPeriodoInicial;
    taskEdited.periodoFinal = editingTaskPeriodoFinal;
    taskEdited.cronogramaId = idCronograma || "";
    taskEdited.etapa = editingTaskEtapa;
    taskEdited._id = editingTaskId;
    let res = await updateCronogramaAtividades(token, taskEdited);
    if(res){
      taskEdited = {
        atividade:'',
        descricaoAtividade:'',
        etapa: '',
        periodoInicial: 0,
        periodoFinal: 0,
        criadaEm: '',
        modificadaEm: '',
        acessadaEm: '',
        cronogramaId: '',
        _id:''
      }
      handleClose();
      const { pathname, query } = router;
      router.push({
        pathname,
        query,
      });
    }
  }else if(idCronograma){
    taskEdited.atividade = editingTaskNome;
    taskEdited.descricaoAtividade = editingTaskDescricao;
    taskEdited.periodoInicial = editingTaskPeriodoInicial;
    taskEdited.periodoFinal = editingTaskPeriodoFinal;
    taskEdited.cronogramaId = idCronograma;
    taskEdited.etapa = editingTaskEtapa;
    let atividadeCreated = await createCronogramaAtividades(token, taskEdited);
    if(atividadeCreated){
      taskEdited = {
        atividade:'',
        descricaoAtividade:'',
        etapa: '',
        periodoInicial: 0,
        periodoFinal: 0,
        criadaEm: '',
        modificadaEm: '',
        acessadaEm: '',
        cronogramaId: '',
        _id:''
      }
      handleClose();
      const { pathname, query } = router;
      router.push({
        pathname,
        query,
      });
    }
  };
}

useEffect(() => {
  const fetchProjetosData = async (strToken: string) => {
    try {
      if(cronogramaId){
        const resAtividades = await  getAtividades(cronogramaId, token);
        if (resAtividades) {
          setTasks(resAtividades);
          setIsLoading(false);
        }
      }        
    } catch (error) {
      console.error("Error fetching tasks data:", error);
    }
  };
  debugger;
  const user = JSON.parse(window.sessionStorage.getItem('user'));
  debugger;
  fetchProjetosData(user.username, token);
}, [ isEdittingTask]);

  const selectedSome = (tasks.length > 0) && (selected.length < tasks.length);
  const selectedAll = (tasks.length > 0) && (selected.length === tasks.length);
  return (
    <Card>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      onSelectAll(event);
                    } else {
                      onDeSelectOne(event.currentTarget.value);
                    }
                  }}
                />
              </TableCell>
              <TableCell>Atividade</TableCell>
              <TableCell>Descrição Atividade</TableCell>
              <TableCell>Etapa</TableCell>
              <TableCell>Período Inicial</TableCell>
              <TableCell>Período Final</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task._id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    value="true"
                    checked={selected.includes(task._id)}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectOne(task._id);
                      } else {
                        onDeSelectOne(task._id);
                      }
                    }}
                  />
                </TableCell>
                <TableCell>{task.atividade}</TableCell>
                <TableCell>{task.descricaoAtividade}</TableCell>
                <TableCell>{getEtapaCaption(task.etapa)}</TableCell>
                <TableCell>{task.periodoInicial}</TableCell>
                <TableCell>{task.periodoFinal}</TableCell>
                <TableCell>
                  <Button
                    id={`editingz${task._id}`}
                    onClick={(e) => {
                      console.log(e);
                      debugger;
                      onEditClick(e);
                    }
                      }>
                    Edit 
                  </Button>
                  <Button 

id={`deleting ${task._id}`}
onClick={(e) => onDeleteClick(e)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <TablePagination
        component="div"
        count={tasks.length}  
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}

export default CronogramaTable;