import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Box, Button, Container, Stack, Typography, TextField, TextareaAutosize, Pagination } from '@mui/material';
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded';
import SystemUpdateRoundedIcon from '@mui/icons-material/SystemUpdateRounded';
import OpenInBrowserRoundedIcon from '@mui/icons-material/OpenInBrowserRounded';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import { Layout as DashboardLayout } from '../../layouts/dashboard/layout';
import { getProjetoData } from '../../scripts/projetos/projeto.data';
import Link from 'next/link';

export default function Page() {
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [cronograma, setCronograma] = useState(null);
  const [selectedField, setSelectedField] = useState({name: '', caption: ''});
  const [loading, setLoading] = useState(true);
  const [_id, set_id] = useState("");

  const handleCreate = async () => {
    const userId = user.pessoa._id;  

    const projetoData = {
      titulo,
      resumoProjeto,
      descricaoProjeto,
      justificativaProjeto,
      metasObjetivos,
      acessibilidade,
      democratizacaoAcesso,
      produtoCultural,
      planoDivulgacao,
      fontesPatrocinio,  
      userId,
      _id 
    };  
    const projetoReturn = await registerProjeto(projetoData, token);
  };

  const getProjectInfo = async (projectId: string) => {
    const token = window.sessionStorage.getItem('token') || '';
    const projeto = await getProjetoData(projectId, token);
    setProject(projeto.project);
    setCronograma(projeto.cronograma);
    setLoading(false);
    return projeto;
  };

  const handleSave = async () => {
    debugger;
    if (!project) {
      return;
    }
    console.log(selectedField, project[selectedField.name]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const projId = router.query.id?.toString();
      if (projId) {
        const projeto = await getProjectInfo(projId);
      }
    };

    fetchData();
  }, [router.query.id]);

  return (
    <>
      <Head>
        <title>
          Projeto {project ? project.titulo : ''}
        </title>
      </Head>
      {!loading && project && (
        <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
          <Container maxWidth="xl">
            <Stack spacing={3}>
            <Button
                  component={Link}
                  href={`/`}
                  startIcon={<ArrowBackIcon />}
                  variant="contained"
                >
                  Voltar ao Dashboard
                </Button>
              <Stack direction="row" justifyContent="space-between" spacing={4}>
                <Stack spacing={1}>
                  <Typography variant="h4">Editar Projeto {project.titulo}</Typography>
                  <Typography>{project.descricaoProjeto}</Typography>
                </Stack>
                <div>
                  <Button color="inherit" startIcon={<IosShareRoundedIcon />}>
                    Import
                  </Button>
                  <Button color="inherit" startIcon={<SystemUpdateRoundedIcon />}>
                    Export
                  </Button>
                  <Button startIcon={<AddIcon />} variant="contained">
                    Add
                  </Button>
                  <Button
                    component={Link}
                    href={`/projetos/${project._id}/cronograma/${cronograma._id}`}
                    startIcon={<OpenInBrowserRoundedIcon />}
                    variant="contained"
                  >
                    Ir para Cronograma
                  </Button>
                </div>
              </Stack>

              {project && (
                <Stack spacing={2}>
                  <Typography variant="h6">Editar Campos</Typography>
                  <Button
                    onClick={() => setSelectedField({ name: 'resumoProjeto', caption: 'Resumo do projeto' })}
                    sx={{ backgroundColor: 'yellow', color: 'black', border: '1px solid yellow' }}
                  >
                    Resumo do Projeto
                  </Button>
                  <Button
                    onClick={() => setSelectedField({ name: 'produtoCultural', caption: 'Produto Cultural' })}
                    sx={{ backgroundColor: 'cyan', color: 'black', border: '1px solid cyan' }}
                  >
                    Produto Cultural
                  </Button>
                  <Button
                    onClick={() => setSelectedField({ name: 'planoDivulgacao', caption: 'Plano de Divulgação' })}
                    sx={{ backgroundColor: 'pink', color: 'black', border: '1px solid pink' }}
                  >
                    Plano de Divulgação
                  </Button>
                  <Button
                    onClick={() => setSelectedField({ name: 'democratizacaoAcesso', caption: 'Democratização do acesso' })}
                    sx={{ backgroundColor: 'lime', color: 'black', border: '1px solid lime' }}
                  >
                    Democratização do Acesso
                  </Button>
                </Stack>
              )}

              {selectedField && (
                <Stack spacing={2}>
                  <Typography variant="h6">Editar {selectedField.caption}</Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    label={selectedField.caption}
                    value={project ? project[selectedField.name] : ''}
                    onChange={(e) => {
                      // Implement handling changes to the selected field
                    }}
                  />
                </Stack>
              )}

              <Stack direction="row" spacing={2}>
                <Button onClick={handleSave} variant="contained" sx={{ backgroundColor: 'green', color: 'white', border: '1px solid green' }}>
                  Save
                </Button>
                {/* Add other buttons with respective functions */}
              </Stack>
            </Stack>
          </Container>
        </Box>
      )}
    </>
  );
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;