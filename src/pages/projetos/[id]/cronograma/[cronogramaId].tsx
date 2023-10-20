import { useCallback, useMemo, useState, useEffect } from 'react';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { useRouter } from 'next/router';
import * as React from 'react';
import Head from 'next/head';
import { Box, Container, Stack, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Layout as DashboardLayout } from '../../../../layouts/auth/layout';
import Link from 'next/link';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import { getProjetoData } from '../../../../scripts/projetos/projeto.data';
import { getCronogramaAtividades } from '../../../../scripts/projetos/cronogramas/atividades/cronograma.atividades.loader';
import CronogramaTable from '../../../../sections/account/projeto/calendario/atividades/atividades-table';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up"
ref={ref}
{...props} />;
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

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);
  const [cronograma, setCronograma] = useState(null);
  const [atividades, setAtividades] = useState([]); // State to hold atividades data
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEdittingTask, setIsEditingTask] = useState(false);
  const fetchProjectName = async () => {
    const projectId = router.query.id?.toString();
    const cronogramaId = router.query.cronogramaId?.toString();

    const token = window.sessionStorage.getItem('token') || '';
    const projeto = await getProjetoData(projectId, token);
    const atividadesData = await getCronogramaAtividades(cronogramaId, token);

    setProject(projeto.project);
    setCronograma(projeto.cronograma);
    setAtividades(atividadesData);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjectName();
  }, [router.query.id]);

  const handleOnDeSelectAll = () => {
    setSelected([]);
  };

  const handleOnSelectAll = () => {
    const allTaskIds = atividades.map((task) => task._id);
    setSelected(allTaskIds);
  };

  const handleOnDeSelectOne = (taskId: string) => {
    debugger;
    setSelected((prevSelected) => {
      console.log(prevSelected);
      // Toggle the selection state for the clicked task ID
      if (!prevSelected.includes(taskId)) {
        debugger;
        // Task is already selected, so remove it
        return prevSelected.filter((id) => id !== taskId);
      } else {
        debugger;
        // Task is not selected, so add it
        return [...prevSelected, taskId];
      }
    });
  }

  const handleOnDeleteClick = (e) => {
    console.log(e.currentTarget.value);
    debugger;
  }
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

  const handleOnSelectOne = (taskId: string) => {
    setSelected((prevSelected) => {
      // Toggle the selection state for the clicked task ID
      if (prevSelected.includes(taskId)) {
        // Task is already selected, so remove it
        return prevSelected.filter((id) => id !== taskId);
      } else {
        // Task is not selected, so add it
        return [...prevSelected, taskId];
      }
    });
  };
  

  const handlePageChange = useCallback((event) => {
    setPage(event.target.value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <div>
      {!loading && (
        <React.Fragment>
          <Head>
            <title>Cronograma de {project?.titulo}</title>
          </Head>
          <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
            <Container maxWidth="xl">
              <Stack spacing={3}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h4">Cronograma de {project?.titulo}</Typography>
                  <Button
                    component={Link}
                    href={`/projetos/${router.query.id}`}
                    startIcon={<ArrowBackIcon />}
                    variant="contained"
                  >
                    Voltar ao Projeto
                  </Button>
                </Stack>
                <CronogramaTable
                  tasks={atividades.map((task) => ({
                    ...task,
                    selected: selected.includes(task._id), // Set selected property based on the array
                  }))}
                  onDeSelectAll={(e) => handleOnDeSelectAll(e)}
                  onDeSelectOne={(e) => handleOnDeSelectOne(e)}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  onSelectAll={(e) => handleOnSelectAll(e)}
                  onSelectOne={(e) => handleOnSelectOne(e)}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  selected={selected}
                />
              </Stack>
            </Container>
          </Box>
        </React.Fragment>
      )}
    </div>
  );
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;